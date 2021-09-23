import { Module } from '@nestjs/common'
import { UserController } from '../controllers'
import { CryptographerService, PrismaService, UserService } from '../services'

@Module({
  controllers: [UserController],
  providers: [UserService, CryptographerService, PrismaService],
})
export class UserModule {}
