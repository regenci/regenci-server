import { Module } from '@nestjs/common'
import { UserController } from '../controllers'
import { AppService, PrismaService, UserService } from '../services'

@Module({
  controllers: [UserController],
  providers: [UserService, AppService, PrismaService],
})
export class UserModule {}
