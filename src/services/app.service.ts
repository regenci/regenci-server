import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  root(ip: string): string {
    return `Hello, welcome to regenci main server! 
              Some details about you:
              - IP address: ${ip}`
  }
}
