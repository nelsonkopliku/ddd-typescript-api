import { Controller, Delete, HttpCode, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { DeleteNode } from 'src/application/cluster/crud/delete-node'
import { ClusterName } from '../../../../domain/cluster/value-objects/cluster-vo'
import { NodeId } from '../../../../domain/cluster/value-objects/node-vo'

@ApiTags('Node Management')
@Controller('cluster/:clusterName/nodes')
export class DeleteNodeController {
  constructor(private readonly deleteNode: DeleteNode) {}

  @ApiOperation({ summary: 'Delete a node from cluster' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('clusterName') clusterName: ClusterName, @Param('id', ParseUUIDPipe) id: NodeId) {
    await this.deleteNode.fromCluster({ clusterName: clusterName, node: id })
  }
}
