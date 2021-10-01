import { AuthService } from './auth.service';
import { ModuleRef } from '@nestjs/core';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private moduleRef;
    private authService;
    constructor(moduleRef: ModuleRef, authService: AuthService);
    validate(req: any, email: string, password: string): Promise<any>;
}
export {};
