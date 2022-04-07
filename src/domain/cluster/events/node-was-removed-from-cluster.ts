import { NodeId } from '../value-objects/node-vo'
import { DomainEvent } from './domain.event'
import { ClusterName } from '../value-objects/cluster-vo'

export class NodeWasRemovedFromCluster implements DomainEvent {
  constructor(public readonly id: NodeId, public readonly cluster: ClusterName) {}
}

export const isNodeWasRemovedFromCluster = (anEvent: DomainEvent): anEvent is NodeWasRemovedFromCluster =>
  anEvent instanceof NodeWasRemovedFromCluster
