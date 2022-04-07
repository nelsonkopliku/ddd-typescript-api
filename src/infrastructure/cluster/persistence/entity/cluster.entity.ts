import { Cluster } from 'src/domain/cluster/cluster'
import { NodeEntity } from './node.entity'
import { ClusterId, ClusterName } from '../../../../domain/cluster/value-objects/cluster-vo'

export class ClusterEntity {
  constructor(
    public readonly clusterId: ClusterId,
    public readonly clusterName: ClusterName,
    public readonly nodes: NodeEntity[]
  ) {}

  public toCluster(): Cluster {
    return Cluster.fromValues(
      this.clusterId,
      this.clusterName,
      this.nodes.map((n: NodeEntity) => n.toNode())
    )
  }
}
