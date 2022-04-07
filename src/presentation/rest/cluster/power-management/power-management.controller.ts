import { Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { PowerManagement } from '../../../../application/cluster/power-management/power-management.service'
import { ClusterName } from '../../../../domain/cluster/value-objects/cluster-vo'
import { NodeId } from '../../../../domain/cluster/value-objects/node-vo'

@ApiTags('Node Power Management')
@Controller('cluster/:clusterName/nodes/:id')
export class PowerManagementController {
  constructor(private readonly powerManagementService: PowerManagement) {}

  @ApiOperation({ summary: 'Issue power on for a node' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('/power-on')
  async issuePowerOn(@Param('clusterName') clusterName: ClusterName, @Param('id', ParseUUIDPipe) id: NodeId) {
    return this.powerManagementService.powerOn({ cluster: clusterName, node: id })
  }

  @ApiOperation({ summary: 'Issue power off for a node' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('/shut-down')
  async issueShutdown(@Param('clusterName') clusterName: ClusterName, @Param('id', ParseUUIDPipe) id: NodeId) {
    return this.powerManagementService.shutDown({ cluster: clusterName, node: id })
  }

  @ApiOperation({ summary: 'Reboot a node' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('/reboot')
  async issueReboot(@Param('clusterName') clusterName: ClusterName, @Param('id', ParseUUIDPipe) id: NodeId) {
    return this.powerManagementService.reboot({ cluster: clusterName, node: id })
  }
}
