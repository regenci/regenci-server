"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("./components");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
async function bootstrap() {
    const app = await core_1.NestFactory.create(components_1.AppModule, new platform_fastify_1.FastifyAdapter());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map