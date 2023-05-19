import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../constants/env';

import UserService from '../services/user';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'];

    if (!token) {
        res.sendStatus(401);
        return;
    }
    try {
        token = token.slice(7);

        const decoded = jwt.verify(token, env.JWT_PRIVATE_KEY) as JwtPayload;

        const user = await UserService.findOne(decoded.user.email);

        if (user?.token === token) {
            next();
            return;
        }
        res.sendStatus(403);
    } catch (error) {
        res.sendStatus(403);
    }
};

export default authenticate;
