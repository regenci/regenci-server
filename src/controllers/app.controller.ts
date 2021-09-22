import { RealIP } from 'nestjs-real-ip'
import { AppService } from '../services'
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@RealIP() ip: string): string {
    return this.appService.root(ip)
  }
}
