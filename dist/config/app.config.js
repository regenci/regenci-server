"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    api: {
        prefix: process.env.API_PREFIX,
    },
    cors_settings: {
        credentials: true,
        origin: ['http://localhost:3000', process.env.FRONT_COMBINATION_PATTERN],
    },
    cookie_parser: {
        secret: process.env.COOKIE_PARSER_SECRET,
    },
    session_settings: {
        secret: process.env.SESSION_SECRET,
        name: 'sess',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 30,
    },
    rate_limit_settings: {
        windowMs: 10 * 60 * 1000,
        max: 100,
    },
});
//# sourceMappingURL=app.config.js.map