import { PrismaService } from './prisma.service'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Injectable, InternalServerErrorException } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  root(ip: string): string {
    return `Hello, welcome to regenci main server! 
              Some details about you:
              - IP address: ${ip}`
  }
  // This is a cron job that auto deletes the account that is not activated after 15 minutes
  @Cron(CronExpression.EVERY_5_MINUTES)
  async deleteIfNotActivated() {
    try {
      return await this.prisma.user.deleteMany({
        where: { is_verified: false, created_at: { lte: new Date(Date.now() - 900000) } },
      })
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }
}
