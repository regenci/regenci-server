import { User } from '@prisma/client';
import { UserService } from '../../user';
import { Strategy } from 'passport-local';
import { JwtPayload } from '../../typings/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new UnauthorizedException('The username or password is invalid');
    }
    return user;
  }
}
