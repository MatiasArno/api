"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatus = exports.configure = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("../constants/env"));
const configure = () => mongoose_1.default.connect(env_1.default.MONGO_URI).then(() => console.log('Connected!'));
exports.configure = configure;
const getStatus = () => {
    return {
        name: 'MongoDB',
        status: mongoose_1.default.connection.readyState === 1 ? 'Ok' : 'Down'
    };
};
exports.getStatus = getStatus;
