import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from '../users/users.module'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { config } from '@server/config'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: config().jwt_settings.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
