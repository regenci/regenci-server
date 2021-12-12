import { User } from '@prisma/client';

export type JwtPayload = Pick<User, 'id' | 'is_admin' | 'is_verified' | 'email_address'>;
