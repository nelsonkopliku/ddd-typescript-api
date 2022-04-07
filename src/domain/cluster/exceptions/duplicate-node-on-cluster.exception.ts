import { ClusterName } from '../value-objects/cluster-vo'
import { NodeId } from '../value-objects/node-vo'

export class DuplicateNodeOnCluster extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }

  static withIds(cluster: ClusterName, nodes: NodeId[]) {
    return new this(`duplicate nodes found in cluster '${cluster}'. '` + nodes.join(`', '`) + `'`)
  }
}
