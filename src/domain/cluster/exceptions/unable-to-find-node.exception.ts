import { NodeId, NodeName } from '../value-objects/node-vo'
import { ClusterName } from '../value-objects/cluster-vo'

export class UnableToFindNode extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }

  public static withNodeId(nodeId: NodeId) {
    return new this(`Node '${nodeId}' was not found`)
  }

  public static withName(nodeName: NodeName, cluster: ClusterName) {
    return new this(`Node '${nodeName}' was not found on cluster '${cluster}'`)
  }
}
