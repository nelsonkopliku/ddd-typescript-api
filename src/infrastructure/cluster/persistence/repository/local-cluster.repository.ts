import { InjectRepository } from '@nestjs/typeorm'
import { Cluster } from 'src/domain/cluster/cluster'
import { NonExistentCluster } from 'src/domain/cluster/exceptions'
import { ClusterRepository } from 'src/domain/cluster/repositories/cluster.repository'
import { Repository } from 'typeorm'
import { ClusterEntity } from '../entity/cluster.entity'
import { NodeEntity } from '../entity/node.entity'
import { Node } from '../../../../domain/cluster/node'
import { isNodeWasAddedToCluster } from '../../../../domain/cluster/events/node-was-added-to-cluster'
import { isNodeOnClusterWasUpdated } from '../../../../domain/cluster/events/node-on-cluster-was-updated'
import { NodeId } from '../../../../domain/cluster/value-objects/node-vo'
import { isNodeWasRemovedFromCluster } from '../../../../domain/cluster/events/node-was-removed-from-cluster'
import {
  CLUSTER_LITE_REPOSITORY,
  clusterById,
  clusterByName,
  ClusterLite,
  ClusterLiteRepository,
} from './cluster-lite.repository'
import { Inject } from '@nestjs/common'
import { ClusterId, ClusterName } from '../../../../domain/cluster/value-objects/cluster-vo'

const findNodeByNodeId = (nodes: Node[], id: NodeId) => nodes.find((N: Node) => N.id === id)

export class LocalClusterRepository implements ClusterRepository {
  constructor(
    @InjectRepository(NodeEntity) private readonly nodeRepository: Repository<NodeEntity>,
    @Inject(CLUSTER_LITE_REPOSITORY) private readonly clusterLiteRepository: ClusterLiteRepository
  ) {}

  async update(cluster: Cluster): Promise<void> {
    const { nodes } = cluster

    // checking events should be somewhere in a AR repository
    for (const event of cluster.uncommittedChanges) {
      if (isNodeWasAddedToCluster(event) || isNodeOnClusterWasUpdated(event)) {
        await this.nodeRepository.save(NodeEntity.fromNode(findNodeByNodeId(nodes, event.id)))
      }
      if (isNodeWasRemovedFromCluster(event)) {
        await this.nodeRepository.delete(event.id)
      }
    }
  }

  async find(id: ClusterId): Promise<Cluster> {
    const clusterLite = this.loadClusterLiteById(id)

    const nodes = await this.nodesForCluster(clusterLite.id)

    return new ClusterEntity(clusterLite.id, clusterLite.name, nodes).toCluster()
  }

  async byName(name: ClusterName): Promise<Cluster> {
    const clusterLite = this.loadClusterLiteByName(name)

    const nodes = await this.nodesForCluster(clusterLite.id)

    return new ClusterEntity(clusterLite.id, clusterLite.name, nodes).toCluster()
  }

  private async nodesForCluster(id: ClusterId): Promise<NodeEntity[]> {
    return this.nodeRepository.find({
      where: {
        cluster: id,
      },
    })
  }

  private loadClusterLiteById(id: ClusterId): ClusterLite {
    return this.loadClusterOrFail(clusterById(id), NonExistentCluster.withId(id))
  }

  private loadClusterLiteByName(name: ClusterName): ClusterLite {
    return this.loadClusterOrFail(clusterByName(name), NonExistentCluster.withName(name))
  }

  private loadClusterOrFail(predicate: (c: ClusterLite) => boolean, errorOnNotFound: Error): ClusterLite {
    const clusterLite = this.clusterLiteRepository.loadCluster(predicate)

    if (clusterLite === undefined) throw errorOnNotFound

    return clusterLite
  }
}
