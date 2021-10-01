"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("./setup");
const config_1 = require("./config");
const core_1 = require("@nestjs/core");
const app_1 = require("./components/app");
const platform_fastify_1 = require("@nestjs/platform-fastify");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_1.AppModule, new platform_fastify_1.FastifyAdapter());
    (0, setup_1.setup)(app);
    await app.listen((0, config_1.config)().port, () => {
        console.info(`
      ################################################
      🛡️  Server listening on port: ${(0, config_1.config)().port} 🛡️
      ################################################
    `);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map