import fetch from 'node-fetch';
import { v4 as uuid } from 'uuid';
import env from '../constants/env';
import { Router } from 'express';
import UserService from '../services/user';
import authenticate from '../middlewares/authenticate';

const router = Router();
const internalFetchAuthId = uuid();

router.get('/users', authenticate, async (req, res, next) => {
    try {
        const { email = '', size = 5, page = 1 } = req.query;

        const response = await fetch(
            `http://127.0.0.1:${env.PORT}/api/internal?email=${(
                email as string
            ).toLowerCase()}&size=${size}&page=${page}`,
            {
                method: 'GET',
                headers: {
                    Authorization: internalFetchAuthId
                }
            }
        );

        const data = await response.json();
        res.json(data);
    } catch (err) {
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
            res.json(await UserService.findOne(email as string));
            return;
        }

        res.json(await UserService.getUsersByPage(Number(page), Number(size)));
    } catch (err) {
        next(err);
    }
});

export { router };
