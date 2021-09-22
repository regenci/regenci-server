import { AppService } from '@server/services'
import { Controller, Get } from '@nestjs/common'
import { RealIP } from 'nestjs-real-ip'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@RealIP() ip: string): string {
    return this.appService.root(ip)
  }
}
