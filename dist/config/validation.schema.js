"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.default = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
    PORT: Joi.number().required(),
});
//# sourceMappingURL=validation.schema.js.map