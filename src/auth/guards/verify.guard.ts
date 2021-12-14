/* eslint-disable @typescript-eslint/no-unused-vars */
import { Observable } from 'rxjs';
import { decode, JwtPayload, verify } from 'jsonwebtoken';
import { config } from '../../config';
import {
  Injectable,
  CanActivate,
  GoneException,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../user';

@Injectable()
export class VerifyGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const verification = req.headers['account-verification'];

    if (!verification) {
      throw new UnauthorizedException('Could not find your account verification token!');
    }
    const token = verification.split(' ')[1];

    verify(token, config().jwt.accessToken, (err: { message: string }, _) => {
      if (err) {
        if (err.message === 'jwt expired') {
          const decoded = decode(token as string) as JwtPayload;
          this.userService.deleteUserById(decoded.id);
          throw new GoneException('Your verification token is expired');
        }
        throw new ForbiddenException(err.message);
      }
    });

    return true;
  }
}
