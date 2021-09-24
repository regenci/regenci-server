import { User } from '.prisma/client'
import { UserService } from '../user'
import { JwtAuthGuard } from '../auth'
import { RealIP } from 'nestjs-real-ip'
import { AppService } from './app.service'
import { RequestWithUser } from '../../shared'
import { ClassSerializerInterceptor, Controller, Get, Request, UseGuards, UseInterceptors } from '@nestjs/common'

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AppController {
  constructor(private readonly userService: UserService, private appService: AppService) {}

  @Get()
  root(@RealIP() ip: string): string {
    return this.appService.root(ip)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@Request() req: RequestWithUser): Promise<User> {
    return await this.userService.findUserById(req.user.id)
  }

  // @UseGuards(JwtAuthGuard)
  // @HttpCode(204)
  // @Patch('/me')
  // async updateMe(
  //   @Request() req: RequestWithUser,
  //   @Body(
  //     new ValidationPipe({
  //       whitelist: true,
  //       forbidNonWhitelisted: true,
  //     })
  //   )
  //   updateUserInput: any
  // ): Promise<any> {
  //   // return await this.userService.updateOne(req.user, updateUserInput)
  // }

  // @UseGuards(JwtAuthGuard)
  // @Delete('/me')
  // async deleteMe(@Request() req: RequestWithUser): Promise<void> {
  //   return await this.userService.deleteUserById({ id: req.user.id })
  // }

  // @Post('/activate-account/')
  // async getVerifyEmail(@Req() code: string): Promise<boolean> {
  //   return !!(await this.userService.verifyEmailToken(code))
  // }
}
