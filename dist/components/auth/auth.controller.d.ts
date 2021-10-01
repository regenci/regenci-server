import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    register(req: any): Promise<{
        msg: string;
    }>;
}
