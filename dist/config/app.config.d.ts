declare const _default: () => {
    env: string;
    port: number;
    api: {
        prefix: string;
    };
    cors_settings: {
        credentials: boolean;
        origin: string[];
    };
    cookie_parser: {
        secret: string;
    };
    session_settings: {
        secret: string;
        name: string;
        httpOnly: boolean;
        sameSite: string;
        secure: boolean;
        maxAge: number;
    };
    rate_limit_settings: {
        windowMs: number;
        max: number;
    };
};
export default _default;
