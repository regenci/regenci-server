import { Account } from '.prisma/client';
import { AccountsService } from '../accounts/accounts.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private accountService;
    private jwtService;
    constructor(accountService: AccountsService, jwtService: JwtService);
    validateAccount(email: string, pass: string): Promise<Partial<Account>>;
    login({ id, email }: Account): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
