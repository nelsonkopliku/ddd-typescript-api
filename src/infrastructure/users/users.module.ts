import { ClassProvider, Module } from '@nestjs/common'
import { USER_REPOSITORY } from 'src/domain/users/repositories/user.repository'
import { MockedUserRepository } from './repositories/mocked-user.repository'

const getUserRepository: ClassProvider = {
  provide: USER_REPOSITORY,
  useClass: MockedUserRepository,
}

@Module({
  providers: [getUserRepository],
  exports: [getUserRepository],
})
export class UsersModule {}
