import { Request } from 'express'
import { User } from '@prisma/client'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'
import { PassportStrategy } from '@nestjs/passport'
import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private as: AuthService) {
    super({
      usernameField: 'email_address',
      passReqToCallback: true,
    })
  }

  async validate(req: Request, email_address: string, password: string): Promise<User | HttpException> {
    try {
      const ip = req.session?.ip_address
      const user = await this.as.signInWithPassword({ email_address, password }, ip)
      if (!user) {
        throw new UnauthorizedException()
      }
      return user
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }
}
