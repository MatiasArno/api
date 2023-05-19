"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const env_1 = __importDefault(require("../constants/env"));
class UserService {
    static async register(email, password) {
        const newUser = new user_1.default({ email, password });
        await newUser.save();
    }
    static async login(email, password) {
        const user = await user_1.default.findOne({ email, password }).lean().exec();
        if (!user)
            return null;
        const token = jsonwebtoken_1.default.sign({ user: { email } }, env_1.default.JWT_PRIVATE_KEY);
        await user_1.default.updateOne({ email: user.email }, { token }).exec();
        return token;
    }
    static async exists(email) {
        return user_1.default.exists({ email }).lean().exec();
    }
    static async findOne(email) {
        return user_1.default.findOne({ email }).lean().exec();
    }
    static async getAllUsers() {
        return user_1.default.find({}, { email: 1 }).lean().exec();
    }
    static async getUsersByPage(page = 1, size = 10) {
        const result = await user_1.default.find({}, { email: 1 })
            .skip((page - 1) * size)
            .limit(size);
        const totalUsers = await user_1.default.count();
        const totalPages = Math.ceil(totalUsers / size);
        const resultObj = {
            totalItems: totalUsers,
            totalPages: totalPages,
            page,
            size
        };
        return { content: result, pagination: resultObj };
    }
}
exports.default = UserService;
