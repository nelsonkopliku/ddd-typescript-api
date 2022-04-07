import { Controller, Request, Post, UseGuards, Inject, HttpStatus } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthenticationService, AUTHENTICATION_SERVICE } from 'src/application/auth/authentication.service'
import { Public } from 'src/infrastructure/auth/decorators/public.decorator'
import { LocalAuthGuard } from 'src/infrastructure/auth/guards/local-auth.guard'

@ApiTags('Authentication')
@Controller()
export class SigninController {
  constructor(@Inject(AUTHENTICATION_SERVICE) private authService: AuthenticationService) {}

  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<{ access_token: string }> {
    return this.authService.login(req.user)
  }
}
