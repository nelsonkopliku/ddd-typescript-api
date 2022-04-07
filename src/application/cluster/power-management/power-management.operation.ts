import { Inject } from '@nestjs/common'
import { CLUSTER_REPOSITORY, ClusterRepository } from '../../../domain/cluster/repositories/cluster.repository'
import {
  POWER_MANAGEMENT_SERVICE,
  PowerManagementService,
} from '../../../domain/cluster/power-management/services/power-management.service'

export abstract class PowerManagementOperation {
  constructor(
    @Inject(CLUSTER_REPOSITORY) protected readonly clusterRepository: ClusterRepository,
    @Inject(POWER_MANAGEMENT_SERVICE) protected readonly powerManagementService: PowerManagementService
  ) {}
}
