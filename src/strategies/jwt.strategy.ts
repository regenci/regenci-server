import { Request } from 'express'
import { User } from '@prisma/client'
import { ConfigService } from '@nestjs/config'
import { UserService } from '../components/user'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly us: UserService, private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), extractJwtFromCookie]),
      ignoreExpiration: false,
      secretOrKey: config.get('jwt.secret'),
    })
  }

  async validate(payload: User, done: VerifiedCallback) {
    try {
      const user = await this.us.findUserById(payload.id)
      if (!user) throw new NotFoundException('There is no account registered with this e-mail address.')
      return done(false, user, null)
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }
}
export function extractJwtFromCookie(req: Request): string {
  return req?.session?.jwt || null
}
