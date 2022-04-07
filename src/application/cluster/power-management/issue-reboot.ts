import { Injectable } from '@nestjs/common'
import { NodeId } from '../../../domain/cluster/value-objects/node-vo'
import { PowerManagementOperation } from './power-management.operation'
import { ClusterName } from '../../../domain/cluster/value-objects/cluster-vo'

@Injectable()
export class IssueReboot extends PowerManagementOperation {
  public async forNode(cluster: ClusterName, node: NodeId) {
    const clusterAggregate = await this.clusterRepository.byName(cluster)
    await clusterAggregate.issueReboot(this.powerManagementService, node)
  }
}
