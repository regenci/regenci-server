import { Strategy } from 'passport-jwt';
import { User } from '.prisma/client';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate({ id, email }: User): Promise<{
        id: number;
        email: string;
    }>;
}
export {};
