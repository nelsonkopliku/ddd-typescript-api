import { UserRepository } from 'src/domain/users/repositories/user.repository'
import { User } from 'src/domain/users/user'
import { mockedUsers } from '../persistence/mocked-user.storage'

export class MockedUserRepository implements UserRepository {
  async findOne(username: string): Promise<User | undefined> {
    return mockedUsers.find(user => user.username === username)
  }
}
