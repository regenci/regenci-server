import { User } from '.prisma/client';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<Partial<User>>;
    login({ id, email }: User): Promise<{
        access_token: any;
    }>;
}
