import { Inject, Injectable } from '@nestjs/common'
import { ClusterRepository, CLUSTER_REPOSITORY } from 'src/domain/cluster/repositories/cluster.repository'
import { ClusterName } from '../../../domain/cluster/value-objects/cluster-vo'
import { NodeId, NodeName } from '../../../domain/cluster/value-objects/node-vo'

@Injectable()
export class UpdateNode {
  constructor(@Inject(CLUSTER_REPOSITORY) private readonly clusterRepository: ClusterRepository) {}

  public async onCluster(clusterName: ClusterName, payload: { id: NodeId; newNodeName: NodeName }) {
    const { id, newNodeName } = payload
    const cluster = await this.clusterRepository.byName(clusterName)

    cluster.updateNode(id, {
      name: newNodeName,
    })

    await this.clusterRepository.update(cluster)

    return cluster.getNode(id)
  }
}
