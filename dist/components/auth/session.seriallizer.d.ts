import { User } from '.prisma/client';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
export declare class SessionSerializer extends PassportSerializer {
    private userService;
    constructor(userService: UsersService);
    serializeUser(user: User, done: any): void;
    deserializeUser({ id }: User, done: any): Promise<void>;
}
