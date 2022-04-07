import { Inject, Injectable } from '@nestjs/common'
import { Node } from 'src/domain/cluster/node'
import { ClusterRepository, CLUSTER_REPOSITORY } from 'src/domain/cluster/repositories/cluster.repository'
import { ClusterName } from '../../../domain/cluster/value-objects/cluster-vo'
import { NodeId } from '../../../domain/cluster/value-objects/node-vo'

type NodeQuery = { clusterName: ClusterName; nodeId: NodeId }

@Injectable()
export class ShowNode {
  constructor(@Inject(CLUSTER_REPOSITORY) private readonly clusterRepository: ClusterRepository) {}

  public async forQuery(query: NodeQuery): Promise<Node> {
    const { clusterName, nodeId } = query
    const cluster = await this.clusterRepository.byName(clusterName)

    return cluster.getNode(nodeId)
  }
}
