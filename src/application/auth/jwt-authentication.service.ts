import { Inject, Injectable } from '@nestjs/common'
import { AuthenticationService } from 'src/application/auth/authentication.service'
import { JwtProvider, JWT_PROVIDER } from 'src/application/auth/jwt/jwt-provider.service'
import { UserRepository, USER_REPOSITORY } from 'src/domain/users/repositories/user.repository'

@Injectable()
export class JwtAuthenticationService implements AuthenticationService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly usersService: UserRepository,
    @Inject(JWT_PROVIDER) private readonly jwtProvider: JwtProvider
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)
    if (user && user.password === pass) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any): Promise<{ access_token: string }> {
    return this.jwtProvider.forUser(user)
  }
}
