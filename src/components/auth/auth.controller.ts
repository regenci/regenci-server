import { User } from '.prisma/client'
import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService, private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user)
  }

  @Post('/register')
  async register(@Req() req) {
    const user: any | User = req.body
    await this.userService.createUser(user)
    return { msg: 'Successfuly registered' }
  }
}
