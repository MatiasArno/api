"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../constants/env"));
const user_1 = __importDefault(require("../services/user"));
const authenticate = async (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    try {
        token = token.slice(7);
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT_PRIVATE_KEY);
        const user = await user_1.default.findOne(decoded.user.email);
        if (user?.token === token) {
            next();
            return;
        }
        res.sendStatus(403);
    }
    catch (error) {
        res.sendStatus(403);
    }
};
exports.default = authenticate;
