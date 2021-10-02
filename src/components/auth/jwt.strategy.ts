import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Account } from '.prisma/client'
import { AccountsService } from '../accounts/accounts.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private accountService: AccountsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: Account) {
    if (!payload) throw new UnauthorizedException()

    const account = await this.accountService.findOne({ id: payload.id })

    if (account.email != payload.email) throw new UnauthorizedException()

    return payload
  }
}
