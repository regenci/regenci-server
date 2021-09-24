import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { PrismaService } from '../../services'
import { UserController } from './user.controller'

@Module({
  imports: [PrismaService],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
