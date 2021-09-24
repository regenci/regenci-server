import { Timeout } from '@nestjs/schedule'
import { PrismaService } from '../../services'
import { Injectable, InternalServerErrorException } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  root(ip: string): string {
    return `Hello, welcome to regenci main server! 
              Some details about you:
              - IP address: ${ip}`
  }

  // This is a cron job that auto deletes a specified account that is not activated after 15 minutes
  @Timeout(10000)
  async deleteIfNotActivated(id: string) {
    try {
      return await this.prisma.user
        .delete({
          where: { id },
        })
        .then(() => console.log('deleted'))
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }
}
