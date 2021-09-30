import { SignUpDto } from './dto'
import { RealIp } from 'nestjs-real-ip'
import { AuthService } from './auth.service'
import { RequestWithUser } from '../../shared'
import { JwtAuthGuard, LocalAuthGuard } from './guards'
import { Body, Controller, Get, InternalServerErrorException, Post, Request, UseGuards } from '@nestjs/common'

@Controller('/authentication')
export class AuthController {
  constructor(private as: AuthService) {}

  @Post('/sign-up')
  public async signUp(@Body() input: SignUpDto, @RealIp() ip: string) {
    return await this.as.signUpWithPassword(input, ip)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(@Request() req: RequestWithUser, @RealIp() ip: string): Promise<void> {
    return await this.addJwtToCookie(req, ip)
  }

  @Get('/logout')
  public logOut(@Request() req: RequestWithUser): void {
    req.session = null
    return
  }

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  getProfile(@Request() req) {
    return req.user
  }
}
