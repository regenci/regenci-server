import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
import { config } from '../../config';
import {
  Injectable,
  CanActivate,
  GoneException,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class VerifyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const verification = req.headers['account-verification'];

    if (!verification) {
      throw new UnauthorizedException('Could not find your account verification token!');
    }
    const token = verification.split(' ')[1];

    verify(token, config().jwt.verifyToken, (err: { message: string }, decoded) => {
      if (err) {
        throw new ForbiddenException(err.message);
      }
      const expired = decoded.exp < new Date().getTime() / 1000;

      if (expired) {
        req.headers['account-verification'] = `expired-${decoded.id}`;
        throw new GoneException('Your verification token is expired');
      }
    });

    return true;
  }
}
