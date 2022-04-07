import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UpdateNode } from 'src/application/cluster/crud/update-node'
import { UpdateNodeRequest } from './dto/update-node'
import { UPDATE_NODE_SCHEMA } from './schemas/update-node.schema'
import { NodeResource } from './schemas/create-node.schema'
import { ClusterName } from '../../../../domain/cluster/value-objects/cluster-vo'
import { NodeId } from '../../../../domain/cluster/value-objects/node-vo'

@ApiTags('Node Management')
@Controller('cluster/:clusterName/nodes')
export class UpdateNodeController {
  constructor(private readonly updateNode: UpdateNode) {}

  @ApiOperation({ summary: 'Update a node' })
  @ApiBody({
    description: 'Node data',
    schema: UPDATE_NODE_SCHEMA,
  })
  @ApiOkResponse({
    description: 'The node resource',
    type: NodeResource,
  })
  @Patch(':id')
  async update(
    @Param('clusterName') clusterName: ClusterName,
    @Param('id', ParseUUIDPipe) id: NodeId,
    @Body() updateNode: UpdateNodeRequest
  ) {
    return this.updateNode.onCluster(clusterName, { id, newNodeName: updateNode.name || null })
  }
}
