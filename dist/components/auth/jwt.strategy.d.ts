import { User } from '.prisma/client';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate({ id, email }: User): Promise<{
        id: string;
        email: any;
    }>;
}
export {};
