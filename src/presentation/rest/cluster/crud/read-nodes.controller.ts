import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ShowNode } from 'src/application/cluster/crud/node-detail'
import { NodeResource } from './schemas/create-node.schema'
import { ClusterName } from '../../../../domain/cluster/value-objects/cluster-vo'
import { NodeId } from '../../../../domain/cluster/value-objects/node-vo'

@ApiTags('Node Management')
@Controller('cluster/:clusterName/nodes')
export class ReadNodesController {
  constructor(private readonly showNode: ShowNode) {}

  @ApiOperation({ summary: 'Get details for a node' })
  @ApiOkResponse({
    description: 'The node resource',
    type: NodeResource,
  })
  @Get(':id')
  async read(@Param('clusterName') clusterName: ClusterName, @Param('id', ParseUUIDPipe) id: NodeId) {
    return this.showNode.forQuery({ clusterName, nodeId: id })
  }
}
