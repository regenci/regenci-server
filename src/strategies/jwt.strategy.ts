import { Request } from 'express'
import { User } from '@prisma/client'
import { JwtPayload } from '../shared'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserService } from '../components/user'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly us: UserService, private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), extractJwtFromCookie]),
      ignoreExpiration: false,
      secretOrKey: config.get('jwt.secret'),
    })
  }

  async validate(payload: JwtPayload): Promise<Partial<User>> {
    // TODO: implement JWT blacklist

    const { id } = payload

    return await this.us.findUserById(id)
  }
}
export function extractJwtFromCookie(req: Request): string {
  return req?.session?.jwt || null
}
