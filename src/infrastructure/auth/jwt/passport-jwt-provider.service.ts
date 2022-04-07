import { JwtProvider } from 'src/application/auth/jwt/jwt-provider.service'
import { User } from 'src/domain/users/user'
import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PassportJwtProvider implements JwtProvider {
  constructor(private readonly jwtService: JwtService) {}

  async forUser(user: User): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
