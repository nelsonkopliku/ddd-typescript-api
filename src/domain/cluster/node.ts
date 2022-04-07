import { NodeId, NodeName } from './value-objects/node-vo'
import { ClusterId } from './value-objects/cluster-vo'

export class Node {
  private constructor(
    public readonly id: NodeId,
    public readonly cluster: ClusterId,
    public name: NodeName,
    public poweredOn = false
  ) {}

  public static reconstitute(id: NodeId, cluster: ClusterId, name: NodeName, poweredOn: boolean) {
    return new this(id, cluster, name, poweredOn)
  }

  public static create(id: NodeId, cluster: ClusterId, name: NodeName): Node {
    return new this(id, cluster, name, false)
  }

  public updateName(newName: NodeName) {
    this.name = newName
  }

  public powerOn() {
    if (!this.poweredOn) {
      this.poweredOn = true
    }
    return this
  }

  public shutDown() {
    if (this.poweredOn) {
      this.poweredOn = false
    }
    return this
  }
}
