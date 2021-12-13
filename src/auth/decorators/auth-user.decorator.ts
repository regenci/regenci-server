import { User } from '@prisma/client';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const AuthUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as User;
  delete user.password;
  return user;
});

export default AuthUser;
