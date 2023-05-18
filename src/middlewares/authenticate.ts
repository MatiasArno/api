import { NextFunction } from "express";
import jwt from "jsonwebtoken";

import { UserService } from "../services/user";

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        const username = req.get("username");
        const role = req.get("role");

        if (username && role) {
            const user = await UserService.fetchOne({ username });

            if (role === user.role) {
                req.user = user;
                next();
                return;
            }
            res.sendStatus(403);
            return;
        }
        res.sendStatus(401);
    } catch (err) {
        next(err);
    }
};

export default authenticate;
