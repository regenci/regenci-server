import { AuthService } from '../services'
import { NewUserCredentialsInput } from '../DTO/user'
import { JwtAuthGuard, LocalAuthGuard } from '../guards'
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'

@Controller('/authentication')
export class AuthController {
  constructor(private as: AuthService) {}

  @Post('sign-up')
  public async signUp(@Body() input: NewUserCredentialsInput) {
    return await this.as.signUp(input)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(@Request() req) {
    return this.as.createToken(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  getProfile(@Request() req) {
    return req.user
  }
}
