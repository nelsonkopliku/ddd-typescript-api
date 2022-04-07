import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UnableToFindNode } from 'src/domain/cluster/exceptions/unable-to-find-node.exception'
import { Node } from 'src/domain/cluster/node'
import { NodeRepository } from 'src/domain/cluster/repositories/node.repository'
import { Repository } from 'typeorm'
import { NodeEntity } from '../entity/node.entity'
import { NodeId } from '../../../../domain/cluster/value-objects/node-vo'

@Injectable()
export class MysqlNodeRepository implements NodeRepository {
  constructor(
    @InjectRepository(NodeEntity)
    private readonly nodeRepository: Repository<NodeEntity>
  ) {}

  async update(id: NodeId, node: Partial<Node>) {
    return this.nodeRepository.update(id, node)
  }

  async save(node: Node) {
    const entity = NodeEntity.fromNode(node)
    return this.nodeRepository.save(entity)
  }

  async find(id: NodeId): Promise<Node> {
    const nodeEntity = await this.nodeRepository.findOne(id)

    if (!nodeEntity) {
      throw UnableToFindNode.withNodeId(id)
    }

    return nodeEntity.toNode()
  }

  async delete(node: NodeId) {
    await this.nodeRepository.delete(node)
  }
}
