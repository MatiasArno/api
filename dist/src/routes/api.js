"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const uuid_1 = require("uuid");
const env_1 = __importDefault(require("../constants/env"));
const express_1 = require("express");
const user_1 = __importDefault(require("../services/user"));
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const router = (0, express_1.Router)();
exports.router = router;
const internalFetchAuthId = (0, uuid_1.v4)();
router.get('/users', authenticate_1.default, async (req, res, next) => {
    try {
        const { email = '', size = 5, page = 1 } = req.query;
        const response = await (0, node_fetch_1.default)(`http://127.0.0.1:${env_1.default.PORT}/api/internal?email=${email.toLowerCase()}&size=${size}&page=${page}`, {
            method: 'GET',
            headers: {
                Authorization: internalFetchAuthId
            }
        });
        const data = await response.json();
        res.json(data);
    }
    catch (err) {
        next(err);
    }
});
router.get('/internal', async (req, res, next) => {
    try {
        if (req.headers.authorization !== internalFetchAuthId) {
            res.sendStatus(404);
            return;
        }
        const { email, size, page } = req.query;
        if (email) {
            res.json(await user_1.default.findOne(email));
            return;
        }
        res.json(await user_1.default.getUsersByPage(Number(page), Number(size)));
    }
    catch (err) {
        next(err);
    }
});
