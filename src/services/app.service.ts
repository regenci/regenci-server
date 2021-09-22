import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  root(ip: string): string {
    return `Hello, welcome to regenci main server! Your IP is: ${ip}`
  }
}
