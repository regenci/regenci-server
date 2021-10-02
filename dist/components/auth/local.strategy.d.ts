import { AuthService } from './auth.service';
import { Account } from '.prisma/client';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<Partial<Account>>;
}
export {};
