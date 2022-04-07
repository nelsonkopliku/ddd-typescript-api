import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { NodeSearch } from 'src/application/cluster/search/node.search'
import { Node } from 'src/domain/cluster/node'
import { ILike, Repository } from 'typeorm'
import { NodeEntity } from '../persistence/entity/node.entity'
import {
  CLUSTER_LITE_REPOSITORY,
  clusterByName,
  ClusterLiteRepository,
} from '../persistence/repository/cluster-lite.repository'

@Injectable()
export class MysqlNodeSearch implements NodeSearch {
  constructor(
    @InjectRepository(NodeEntity) private readonly nodeRepository: Repository<NodeEntity>,
    @Inject(CLUSTER_LITE_REPOSITORY) private readonly clusterLiteRepository: ClusterLiteRepository
  ) {}

  async byNodeName(nodeName: string): Promise<Node[]> {
    const entities = await this.nodeRepository.find({
      where: { name: ILike(`%${nodeName}%`) },
    })
    return entities.map(this.entitiesToNodes)
  }

  async byClusterName(clusterName: string): Promise<Node[]> {
    const clusterLite = this.clusterLiteRepository.loadCluster(clusterByName(clusterName))
    if (clusterLite === undefined) return []

    const entities = await this.nodeRepository.find({
      where: { cluster: clusterLite.id },
    })
    return entities.map(this.entitiesToNodes)
  }

  private entitiesToNodes = (n: NodeEntity): Node => n.toNode()
}
