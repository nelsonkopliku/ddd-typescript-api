import { ClassProvider, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NodeEntity } from './infrastructure/cluster/persistence/entity/node.entity'
import { ReadNodesController } from './presentation/rest/cluster/crud/read-nodes.controller'
import { POWER_MANAGEMENT_SERVICE } from './domain/cluster/power-management/services/power-management.service'
import { AuthModule } from './infrastructure/auth/auth.module'
import { NODE_SEARCH } from './application/cluster/search/node.search'
import { SearchNodeController } from './presentation/rest/cluster/search/search-node.controller'
import { PowerManagementController } from './presentation/rest/cluster/power-management/power-management.controller'
import { NODE_REPOSITORY } from './domain/cluster/repositories/node.repository'
import { MysqlNodeRepository } from './infrastructure/cluster/persistence/repository/mysql-node.repository'
import { MysqlNodeSearch } from './infrastructure/cluster/search/mysql-node.search'
import { CreateNodeController } from './presentation/rest/cluster/crud/create-node.controller'
import { DeleteNodeController } from './presentation/rest/cluster/crud/delete-node.controller'
import { UpdateNodeController } from './presentation/rest/cluster/crud/update-node.controller'
import { CLUSTER_REPOSITORY } from './domain/cluster/repositories/cluster.repository'
import { CreateNode } from './application/cluster/crud/create-node'
import { UpdateNode } from './application/cluster/crud/update-node'
import { DeleteNode } from './application/cluster/crud/delete-node'
import { LocalClusterRepository } from './infrastructure/cluster/persistence/repository/local-cluster.repository'
import { ShowNode } from './application/cluster/crud/node-detail'
import { APP_FILTER } from '@nestjs/core'
import { ClusterManagementExceptionFilter } from './presentation/rest/cluster/crud/filters/cluster-management.exception.filter'
import { DummyMysqlPowerManagement } from './infrastructure/cluster/power-management/dummy-mysql-power-management'
import { PowerManagement } from './application/cluster/power-management/power-management.service'
import { IssuePowerOn } from './application/cluster/power-management/issue-power-on'
import { IssueShutDown } from './application/cluster/power-management/issue-shut-down'
import { IssueReboot } from './application/cluster/power-management/issue-reboot'
import {
  CLUSTER_LITE_REPOSITORY,
  ClusterLiteRepositoryImpl,
} from './infrastructure/cluster/persistence/repository/cluster-lite.repository'

const getPowerManagementService: ClassProvider = {
  provide: POWER_MANAGEMENT_SERVICE,
  useClass: DummyMysqlPowerManagement,
}

const getNodeSearchService: ClassProvider = {
  provide: NODE_SEARCH,
  useClass: MysqlNodeSearch,
}

const getNodeRepositoryService: ClassProvider = {
  provide: NODE_REPOSITORY,
  useClass: MysqlNodeRepository,
}

const getClusterRepositoryService: ClassProvider = {
  provide: CLUSTER_REPOSITORY,
  useClass: LocalClusterRepository,
}

const getClusterLiteRepositoryService: ClassProvider = {
  provide: CLUSTER_LITE_REPOSITORY,
  useClass: ClusterLiteRepositoryImpl,
}

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([NodeEntity]),
  ],
  controllers: [
    CreateNodeController,
    ReadNodesController,
    UpdateNodeController,
    DeleteNodeController,
    SearchNodeController,
    PowerManagementController,
  ],
  providers: [
    getPowerManagementService,
    PowerManagement,
    getNodeSearchService,
    getNodeRepositoryService,
    getClusterRepositoryService,
    getClusterLiteRepositoryService,
    CreateNode,
    UpdateNode,
    DeleteNode,
    ShowNode,
    IssuePowerOn,
    IssueShutDown,
    IssueReboot,
    {
      provide: APP_FILTER,
      useClass: ClusterManagementExceptionFilter,
    },
  ],
})
export class ClusterManagementModule {}
