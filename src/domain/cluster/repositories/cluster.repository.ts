import { Cluster } from '../cluster'
import { ClusterId, ClusterName } from '../value-objects/cluster-vo'

export interface ClusterRepository {
  update(cluster: Cluster): Promise<void>
  find(id: ClusterId): Promise<Cluster>
  byName(name: ClusterName): Promise<Cluster>
}

export const CLUSTER_REPOSITORY = 'ClusterRepository'
