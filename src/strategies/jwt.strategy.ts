import config from '../config'
import { User } from '@prisma/client'
import { UserService } from '../services'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly us: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config().secrets.jwtModule,
    })
  }

  async validate(payload: User, done: VerifiedCallback) {
    try {
      const user = await this.us.findUserById({ id: payload.id })
      if (!user) throw new NotFoundException('There is no account registered with this e-mail address.')
      return done(false, user, null)
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }
}
