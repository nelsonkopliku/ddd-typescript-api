import { Inject, Injectable } from '@nestjs/common'
import { Node } from 'src/domain/cluster/node'
import { ClusterRepository, CLUSTER_REPOSITORY } from 'src/domain/cluster/repositories/cluster.repository'
import { v4 as uuidv4 } from 'uuid'
import { ClusterName } from '../../../domain/cluster/value-objects/cluster-vo'
import { NodeName } from '../../../domain/cluster/value-objects/node-vo'

@Injectable()
export class CreateNode {
  constructor(@Inject(CLUSTER_REPOSITORY) private readonly clusterRepository: ClusterRepository) {}

  public async onCluster(payload: { clusterName: ClusterName; nodeName: NodeName }): Promise<Node> {
    const { clusterName, nodeName } = payload

    const cluster = await this.clusterRepository.byName(clusterName),
      nextNodeId = uuidv4(),
      createdNode = Node.create(nextNodeId, cluster.id, nodeName)

    cluster.addNode(createdNode)

    await this.clusterRepository.update(cluster)

    return createdNode
  }
}
