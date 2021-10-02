import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { config } from '@server/config'
import { Account } from '.prisma/client'
import { JwtService } from '@nestjs/jwt'
import { AccountsService } from '../accounts/accounts.service'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private accountService: AccountsService, private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('refresh-token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    })
  }

  async validate(payload: Account) {
    if (!payload) throw new UnauthorizedException()

    const account = await this.accountService.findOne({ id: payload.id })

    if (account.email != payload.email) throw new UnauthorizedException()

    return payload
  }
}
