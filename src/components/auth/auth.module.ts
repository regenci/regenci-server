import { UserModule } from '../user'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PrismaService } from '../../services'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy, LocalStrategy } from './strategies'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [PassportModule, UserModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
