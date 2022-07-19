"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const mongoConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (config) => {
        return {
            uri: config.get('MONGO_URI'),
        };
    },
};
exports.default = mongoConfig;
//# sourceMappingURL=mongoConfig.js.map