import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { AccountsService } from './accounts.service'

@Module({
  providers: [AccountsService, PrismaService],
  exports: [AccountsService],
})
export class AccountsModule {}
