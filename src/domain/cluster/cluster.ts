import { DuplicateNodeOnCluster, UnableToAddNode, UnableToRemoveNode, UnableToUpdateNode } from './exceptions'
import { Node } from './node'
import { DomainEvent } from './events/domain.event'
import { NodeWasAddedToCluster } from './events/node-was-added-to-cluster'
import { NodeOnClusterWasUpdated } from './events/node-on-cluster-was-updated'
import { NodeWasRemovedFromCluster } from './events/node-was-removed-from-cluster'
import { OperationNotPermittedOnNodeException } from './exceptions/operation-not-permitted-on-node.exception'
import { PowerManagementService } from './power-management/services/power-management.service'
import { NodeId, NodeName } from './value-objects/node-vo'
import { ClusterId, ClusterName } from './value-objects/cluster-vo'

const nodesToMap = (nodes: Node[]) => new Map<NodeId, Node>(nodes.map((n: Node) => [n.id, n]))

export class Cluster {
  private _nodes: Map<NodeId, Node>
  private _events: DomainEvent[] = []

  get nodes(): Node[] {
    return [...this._nodes.values()]
  }

  get uncommittedChanges(): DomainEvent[] {
    const pendingEvents = this._events
    this._events = []
    return pendingEvents
  }

  private constructor(public readonly id: ClusterId, public readonly name: ClusterName, nodes: Node[]) {
    this.assertNoDuplicatesInNodes(nodes)
    this._nodes = nodesToMap(nodes)
  }

  public static fromValues(id: ClusterId, clusterName: ClusterName, nodes: Node[]): Cluster {
    return new this(id, clusterName, nodes)
  }

  public addNode(node: Node) {
    this.assertNodeCanBeAdded(node)
    this._nodes.set(node.id, node)
    this._events.push(new NodeWasAddedToCluster(node.id, node.name, node.cluster))
  }

  public updateNode(node: NodeId, newNode: Partial<Node>) {
    this.assertNodeCanBeUpdated(node)
    this._nodes.get(node)?.updateName(newNode.name)
    this._events.push(new NodeOnClusterWasUpdated(node, newNode.name, this.name))
  }

  public removeNode(node: NodeId) {
    this.assertNodeCanBeRemoved(node)
    this._nodes.delete(node)
    this._events.push(new NodeWasRemovedFromCluster(node, this.name))
  }

  public async issuePowerOn(powerManagementService: PowerManagementService, node: NodeId) {
    this.assertCanExecuteOperationOnNode(node, 'issuePowerOn')

    await powerManagementService.powerOn(this._nodes.get(node))
    // maybe some event could be raised here
  }

  public async issueShutDown(powerManagementService: PowerManagementService, node: NodeId) {
    this.assertCanExecuteOperationOnNode(node, 'issueShutDown')

    await powerManagementService.shutDown(this._nodes.get(node))
    // maybe some event could be raised here
  }

  public async issueReboot(powerManagementService: PowerManagementService, node: NodeId) {
    this.assertCanExecuteOperationOnNode(node, 'issueReboot')
    await powerManagementService.reboot(this._nodes.get(node))
    // maybe some event could be raised here
  }

  public getNode(node: NodeId): Node {
    return this.hasNode(node) ? this._nodes.get(node) : null
  }

  private assertNodeCanBeAdded(node: Node) {
    if (!this.isNameAvailable(node.name))
      throw UnableToAddNode.becauseANodeWithSameNameAlreadyExistsOnThisCluster(this.name, node.name)
  }

  private assertNodeCanBeUpdated(node: NodeId) {
    if (!this.hasNode(node)) throw UnableToUpdateNode.becauseItDoesNotBelongToThisCluster(this.name, node)
  }

  private assertNodeCanBeRemoved(node: NodeId) {
    if (!this.hasNode(node)) throw UnableToRemoveNode.becauseItDoesNotBelongToThisCluster(this.name, node)
  }

  private assertCanExecuteOperationOnNode(node: NodeId, operation: string) {
    if (!this.hasNode(node))
      throw OperationNotPermittedOnNodeException.becauseNodeDoesNotBelongToThisCluster(operation, node, this.name)
  }

  private hasNode(node: NodeId): boolean {
    return this._nodes.has(node)
  }

  private isNameAvailable(name: NodeName): boolean {
    return !(this.nodes.find((n: Node) => n.name === name) instanceof Node)
  }

  private assertNoDuplicatesInNodes(nodes: Node[]) {
    const duplicates = (nodes: Node[]) => {
      const dict = ((nodeList: Node[]) => nodeList.reduce((a, b) => ({ ...a, [b.id]: (a[b.id] || 0) + 1 }), {}))(nodes)
      return Object.keys(dict).filter(a => dict[a] > 1)
    }

    const duplicateNodes = duplicates(nodes)

    if (duplicateNodes.length > 0) {
      throw DuplicateNodeOnCluster.withIds(this.name, duplicateNodes)
    }
  }
}
