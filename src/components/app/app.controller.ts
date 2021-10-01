import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from '../auth/local-auth.guard'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @UseGuards(LocalAuthGuard)
  @Get('test')
  test(@Req() req): string {
    console.log(req.user)
    return 'kasdlkasldkk'
  }
}
