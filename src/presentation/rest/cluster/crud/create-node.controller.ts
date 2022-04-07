import { Body, Controller, Param, Post, UseFilters } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateNode } from 'src/application/cluster/crud/create-node'
import { CreateNodeRequest } from './dto/create-node'
import { CREATE_NODE_SCHEMA, CreatedNode } from './schemas/create-node.schema'
import { ClusterName } from '../../../../domain/cluster/value-objects/cluster-vo'

@ApiTags('Node Management')
@Controller('cluster/:clusterName/nodes')
export class CreateNodeController {
  constructor(private readonly createNode: CreateNode) {}

  @ApiOperation({ summary: 'Create a node in a cluster' })
  @ApiBody({
    description: 'Node data',
    schema: CREATE_NODE_SCHEMA,
  })
  @ApiCreatedResponse({
    description: 'the created node',
    type: CreatedNode,
  })
  @Post()
  async create(@Param('clusterName') clusterName: ClusterName, @Body() createNode: CreateNodeRequest) {
    return this.createNode.onCluster({ clusterName, nodeName: createNode.name })
  }
}
