import { NodeId, NodeName } from '../value-objects/node-vo'
import { DomainEvent } from './domain.event'
import { ClusterName } from '../value-objects/cluster-vo'

export class NodeOnClusterWasUpdated implements DomainEvent {
  constructor(
    public readonly id: NodeId,
    /**
     * newNodeName is not being used as we are updating nodes like this
     * await this.nodeRepository.save(NodeEntity.fromNode(findNodeByNodeId(nodes, event.id)))
     * @see  src/infrastructure/cluster/persistence/repository/local-cluster.repository.ts:37
     */
    public readonly newNodeName: NodeName,
    public readonly cluster: ClusterName
  ) {}
}

export const isNodeOnClusterWasUpdated = (anEvent: DomainEvent): anEvent is NodeOnClusterWasUpdated =>
  anEvent instanceof NodeOnClusterWasUpdated
