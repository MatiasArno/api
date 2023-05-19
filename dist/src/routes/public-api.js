"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_1 = __importDefault(require("../services/user"));
const router = (0, express_1.Router)();
exports.router = router;
router.post('/register', async (req, res, next) => {
    try {
        const email = req.body.email.toLowerCase();
        const { password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: 'Email and password are required'
            });
            return;
        }
        const userExists = await user_1.default.exists(email);
        if (userExists) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }
        await user_1.default.register(email, password);
        res.status(201).json({
            message: `${email} was created successfully!`
        });
    }
    catch (err) {
        next(err);
    }
});
router.post('/login', async (req, res, next) => {
    try {
        const email = req.body.email.toLowerCase();
        const { password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: 'Email and password are required.'
            });
            return;
        }
        const token = await user_1.default.login(email, password);
        if (!token) {
            res.status(401).json({ message: 'Email or password are wrong.' });
            return;
        }
        res.json({ token });
    }
    catch (err) {
        next(err);
    }
});
