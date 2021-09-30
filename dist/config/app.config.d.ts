declare const _default: () => {
    env: string;
    port: number;
    api: {
        prefix: string;
        keys: {
            IP: string;
            sendgrid: string;
        };
    };
    url: {
        devUrl: string;
        production: string;
    };
    cors_settings: {
        credentials: boolean;
        origin: string[];
    };
    jwt_settings: {
        expiresIn: string;
        secret: string;
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
    sendgrid: {
        templates: {
            reset: string;
            register: string;
        };
        from: {
            verify: string;
            reset: string;
        };
    };
};
export default _default;
