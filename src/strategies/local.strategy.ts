import { User } from '@prisma/client'
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../components/auth'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private as: AuthService) {
    super({
      usernameField: 'email_address',
    })
  }

  async validate(email_address: string, password: string): Promise<User | HttpException> {
    try {
      // const user = await this.as.signIn({ email_address, password })
      // if (!user) throw new UnauthorizedException()

      return
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }
}
