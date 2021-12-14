/* eslint-disable @typescript-eslint/no-unused-vars */
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
import { config } from '../../config';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const authorization = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException('Could not find your authorization token!');
    }
    const token = authorization.split(' ')[1];

    verify(token, config().jwt.accessToken, (err: { message: string }, _: any) => {
      if (err) {
        throw new ForbiddenException(err.message);
      }
    });

    return true;
  }
}
