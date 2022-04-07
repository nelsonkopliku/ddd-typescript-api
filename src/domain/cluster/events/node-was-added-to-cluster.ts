import { NodeId, NodeName } from '../value-objects/node-vo'
import { DomainEvent } from './domain.event'
import { ClusterName } from '../value-objects/cluster-vo'

export class NodeWasAddedToCluster implements DomainEvent {
  constructor(public readonly id: NodeId, public readonly nodeName: NodeName, public readonly cluster: ClusterName) {}
}

export const isNodeWasAddedToCluster = (anEvent: DomainEvent): anEvent is NodeWasAddedToCluster =>
  anEvent instanceof NodeWasAddedToCluster
