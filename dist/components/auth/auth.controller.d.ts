import { UsersService } from '../users/users.service';
export declare class AuthController {
    private userService;
    constructor(userService: UsersService);
    login(req: any): Promise<any>;
    register(req: any): Promise<{
        msg: string;
    }>;
}
