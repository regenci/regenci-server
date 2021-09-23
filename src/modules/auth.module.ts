import { Module } from '@nestjs/common'
import { AuthController } from '../controllers'
import { JwtStrategy, LocalStrategy } from '../strategies'
import { AuthService, AppService, PrismaService, UserService } from '../services'

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, UserService, AppService, LocalStrategy, JwtStrategy, PrismaService],
})
export class AuthModule {}
