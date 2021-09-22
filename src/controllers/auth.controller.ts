import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from '../guards'

@Controller('/authentication')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(@Request() req) {
    return req.user
  }
}
