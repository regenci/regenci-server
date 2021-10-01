import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ModuleRef } from '@nestjs/core'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef, private authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true })
  }

  async validate(req: any, email: string, password: string): Promise<any> {
    console.log(req.session)
    const user = await this.authService.validateUser(email, password)

    if (!user) throw new UnauthorizedException()

    return user
  }
}
