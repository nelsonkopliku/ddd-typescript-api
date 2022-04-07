import { ClassProvider, Module } from '@nestjs/common'
import { JwtAuthenticationService } from '../../application/auth/jwt-authentication.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { SigninController } from '../../presentation/rest/auth/signin.controller'
import { UsersModule } from '../users/users.module'
import { jwtConstants } from './jwt/jwt.secrets'
import { LocalStrategy } from './strategy/local.strategy'
import { JwtStrategy } from './strategy/jwt.strategy'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { JWT_PROVIDER } from 'src/application/auth/jwt/jwt-provider.service'
import { PassportJwtProvider } from './jwt/passport-jwt-provider.service'
import { AUTHENTICATION_SERVICE } from 'src/application/auth/authentication.service'

const getTokenProviderService: ClassProvider = {
  provide: JWT_PROVIDER,
  useClass: PassportJwtProvider,
}

const getAuthenticationService: ClassProvider = {
  provide: AUTHENTICATION_SERVICE,
  useClass: JwtAuthenticationService,
}

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  providers: [
    getAuthenticationService,
    getTokenProviderService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [SigninController],
})
export class AuthModule {}
