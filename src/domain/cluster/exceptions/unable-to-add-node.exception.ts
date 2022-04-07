import { NodeName } from '../value-objects/node-vo'
import { ClusterName } from '../value-objects/cluster-vo'

export class UnableToAddNode extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }

  public static becauseANodeWithSameNameAlreadyExistsOnThisCluster(clusterName: ClusterName, nodeName: NodeName) {
    return new this(`Node '${nodeName}' already exists on cluter '${clusterName}'`)
  }
}
