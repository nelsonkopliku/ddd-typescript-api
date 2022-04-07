import { User } from 'src/domain/users/user'

export interface JwtProvider {
  forUser(user: User): Promise<{ access_token: string }>
}

export const JWT_PROVIDER = 'JwtTokenProvider'
