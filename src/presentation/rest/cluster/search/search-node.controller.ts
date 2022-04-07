import { Controller, DefaultValuePipe, Get, Inject, Param, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { NodeSearch, NODE_SEARCH } from 'src/application/cluster/search/node.search'
import { SearchNode } from './dto/search-node'
import { NodeResource } from '../crud/schemas/create-node.schema'

const clusterName = 'clusterName'
const nodeName = 'nodeName'

@ApiTags('Node Search')
@Controller('nodes')
export class SearchNodeController {
  constructor(@Inject(NODE_SEARCH) private readonly nodeSearch: NodeSearch) {}

  @ApiOperation({ summary: 'Search nodes by cluster or by node name' })
  @ApiQuery({
    name: 'searchBy',
    enum: [clusterName, nodeName],
  })
  @ApiOkResponse({
    description: 'The node resource',
    type: [NodeResource],
  })
  @Get()
  async byNodeName(@Query() query: SearchNode) {
    switch (query.searchBy) {
      case clusterName:
        return this.nodeSearch.byClusterName(query.term)
      case nodeName:
        return this.nodeSearch.byNodeName(query.term)
      default:
    }
  }
}
