import { ClusterId, ClusterName } from '../value-objects/cluster-vo'

export class NonExistentCluster extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }

  static withId(cluster: ClusterId) {
    return new this(`Cluster with id '${cluster}' does not exist`)
  }

  static withName(cluster: ClusterName) {
    return new this(`Cluster with name '${cluster}' does not exist`)
  }
}
