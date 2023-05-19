"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_dotenv_1 = require("ts-dotenv");
const schema = {
    NODE_ENV: String,
    PORT: Number,
    MONGO_URI: String,
    JWT_PRIVATE_KEY: String
};
const env = (0, ts_dotenv_1.load)(schema);
exports.default = env;
