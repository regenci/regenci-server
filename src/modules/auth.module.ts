import { Module } from '@nestjs/common'
import { AuthService } from '../services'
import { UserModule } from './user.module'
import { LocalStrategy } from '../strategies'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
