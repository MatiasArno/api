"use strict";
// Levanta config de entorno
// Llama a Express. Genera APP.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./src/constants/env"));
const src_1 = __importDefault(require("./src"));
src_1.default.listen(env_1.default.PORT, () => {
    console.log(`Server running on port ${env_1.default.PORT}`);
});
