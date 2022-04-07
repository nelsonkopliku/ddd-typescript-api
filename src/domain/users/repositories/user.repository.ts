import { User } from '../user'

export interface UserRepository {
  findOne(username: string): Promise<User | undefined>
}

export const USER_REPOSITORY = 'UserRepository'
