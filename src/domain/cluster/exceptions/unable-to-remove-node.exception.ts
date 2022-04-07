import { ClusterName } from '../value-objects/cluster-vo'
import { NodeName } from '../value-objects/node-vo'

export class UnableToRemoveNode extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }

  public static becauseItDoesNotBelongToThisCluster(clusterName: ClusterName, nodeName: NodeName) {
    return new this(
      `Node '${nodeName}' does not exist on cluster '${clusterName}'. It cannot be removed from this cluster`
    )
  }
}
