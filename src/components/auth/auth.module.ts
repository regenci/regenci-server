import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AccountsModule } from '../accounts/accounts.module'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'
import { JwtRefreshStrategy } from './jwt-refresh.strategy'

@Module({
  imports: [AccountsModule, PassportModule, JwtModule.register({})],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
