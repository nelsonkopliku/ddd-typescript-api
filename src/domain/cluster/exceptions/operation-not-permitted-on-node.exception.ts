import { NodeId } from '../value-objects/node-vo'
import { ClusterName } from '../value-objects/cluster-vo'

export class OperationNotPermittedOnNodeException extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }

  static becauseNodeDoesNotBelongToThisCluster(op: string, node: NodeId, cluster: ClusterName) {
    return new this(
      `Unable to perform operation '${op}' on node '${node}' because it does not belong to current cluster '${cluster}'`
    )
  }
}
