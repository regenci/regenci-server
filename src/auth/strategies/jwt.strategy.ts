import { config } from '../../config';
import { UserService } from '../../user';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config().jwt.accessToken,
    });
  }

  async validate(payload: { email_address: string }) {
    const user = await this.userService.findUserByEmail(payload.email_address);

    return user;
  }
}
