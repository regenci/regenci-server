import { Account } from '.prisma/client'
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AccountsService } from '../accounts/accounts.service'
import { AuthService } from './auth.service'
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private accountService: AccountsService, private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('/refresh-token')
  async refreshToken(@Req() req) {
    return this.authService.login(req.user)
  }

  @Post('/register')
  async register(@Req() req) {
    const account: any | Account = req.body
    await this.accountService.createAccount(account)
    return { msg: 'Successfuly registered' }
  }
}
