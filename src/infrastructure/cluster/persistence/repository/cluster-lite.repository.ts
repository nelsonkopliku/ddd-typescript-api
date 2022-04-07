import { Injectable } from '@nestjs/common'
import { ClusterId, ClusterName } from '../../../../domain/cluster/value-objects/cluster-vo'

export type ClusterLite = { id: ClusterId; name: ClusterName }

const clusters: ClusterLite[] = [
  {
    id: 'b27f20e0-08d2-4401-8d5a-9f1dd1f1414f',
    name: 'cluster.name.01',
  },
  {
    id: 'e9ad75c2-c8d8-40b8-891d-4a56fd8fa6eb',
    name: 'cluster.name.02',
  },
]

export const clusterById = (id: ClusterId) => (c: ClusterLite) => c.id === id
export const clusterByName = (name: ClusterName) => (c: ClusterLite) => c.name === name

export interface ClusterLiteRepository {
  loadCluster(predicate: (c: ClusterLite) => boolean): ClusterLite | undefined
}

export const CLUSTER_LITE_REPOSITORY = 'ClusterLiteRepository'

@Injectable()
export class ClusterLiteRepositoryImpl implements ClusterLiteRepository {
  public loadCluster(predicate: (c: ClusterLite) => boolean): ClusterLite | undefined {
    return clusters.find(predicate)
  }
}
