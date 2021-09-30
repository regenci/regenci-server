import { EmailModule } from '../email'
import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from '../../services'
import { UserController } from './user.controller'

@Module({
  imports: [ConfigModule, EmailModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
