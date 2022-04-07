import { IssuePowerOn } from './issue-power-on'
import { IssueShutDown } from './issue-shut-down'
import { IssueReboot } from './issue-reboot'
import {
  PowerOnNode,
  RebootNode,
  ShutDownOnNode,
} from '../../../domain/cluster/power-management/services/power-management.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PowerManagement {
  constructor(
    private readonly issuePowerOn: IssuePowerOn,
    private readonly issueShutDown: IssueShutDown,
    private readonly issueReboot: IssueReboot
  ) {}

  async powerOn(operation: PowerOnNode) {
    await this.issuePowerOn.forNode(operation.cluster, operation.node)
  }

  async shutDown(operation: ShutDownOnNode) {
    await this.issueShutDown.forNode(operation.cluster, operation.node)
  }

  async reboot(operation: RebootNode) {
    await this.issueReboot.forNode(operation.cluster, operation.node)
  }
}
