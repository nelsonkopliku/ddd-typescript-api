import { Inject, Injectable } from '@nestjs/common'
import { NODE_REPOSITORY, NodeRepository } from '../../../domain/cluster/repositories/node.repository'
import { Node } from '../../../domain/cluster/node'
import { NodeEntity } from '../persistence/entity/node.entity'
import { PowerManagementService } from '../../../domain/cluster/power-management/services/power-management.service'

@Injectable()
export class DummyMysqlPowerManagement implements PowerManagementService {
  constructor(@Inject(NODE_REPOSITORY) private readonly nodeRepository: NodeRepository) {}

  async powerOn(node: Node) {
    node.powerOn()
    this.nodeRepository.update(node.id, NodeEntity.fromNode(node))
  }

  async shutDown(node: Node) {
    node.shutDown()
    this.nodeRepository.update(node.id, NodeEntity.fromNode(node))
  }

  async reboot(node: Node) {
    await this.shutDown(node)

    await this.powerOn(node)
  }
}
