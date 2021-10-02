import { AccountsService } from '../accounts/accounts.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private accountService;
    private authService;
    constructor(accountService: AccountsService, authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    register(req: any): Promise<{
        msg: string;
    }>;
}
