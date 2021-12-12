"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const hpp = require("hpp");
const config_1 = require("./config");
const fastify_cors_1 = require("fastify-cors");
const fastify_cookie_1 = require("fastify-cookie");
const fastify_helmet_1 = require("fastify-helmet");
const fastify_compress_1 = require("fastify-compress");
const fastify_rate_limit_1 = require("fastify-rate-limit");
const session_1 = require("@fastify/session");
function setup(app) {
    app.setGlobalPrefix((0, config_1.config)().api.prefix);
    app.use(hpp());
    app.register(fastify_helmet_1.default);
    app.register(fastify_cors_1.default, (0, config_1.config)().cors_settings);
    app.register(fastify_rate_limit_1.default, (0, config_1.config)().rate_limit_settings);
    app.register(fastify_compress_1.default);
    app.register(fastify_cookie_1.default, {
        secret: (0, config_1.config)().cookie_parser.secret,
    });
    app.register(session_1.default, (0, config_1.config)().session_settings);
    return app;
}
exports.setup = setup;
//# sourceMappingURL=setup.js.map