import { ClusterName } from '../value-objects/cluster-vo'
import { NodeName } from '../value-objects/node-vo'

export class UnableToUpdateNode extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }

  public static becauseItDoesNotBelongToThisCluster(clusterName: ClusterName, nodeName: NodeName): UnableToUpdateNode {
    return new this(`Node '${nodeName}' does not exist on cluster '${clusterName}'. It cannot be updated here`)
  }
}
