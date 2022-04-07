import { Inject, Injectable } from '@nestjs/common'
import { ClusterRepository, CLUSTER_REPOSITORY } from 'src/domain/cluster/repositories/cluster.repository'
import { NodeId } from '../../../domain/cluster/value-objects/node-vo'
import { ClusterName } from '../../../domain/cluster/value-objects/cluster-vo'

@Injectable()
export class DeleteNode {
  constructor(@Inject(CLUSTER_REPOSITORY) private readonly clusterRepository: ClusterRepository) {}

  public async fromCluster(payload: { clusterName: ClusterName; node: NodeId }) {
    const { clusterName, node } = payload
    const cluster = await this.clusterRepository.byName(clusterName)

    cluster.removeNode(node)

    return this.clusterRepository.update(cluster)
  }
}
