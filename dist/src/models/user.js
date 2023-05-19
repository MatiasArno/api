"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userData = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: String
}, { collection: 'users', timestamps: true });
const User = (0, mongoose_1.model)('User', userData);
exports.default = User;
