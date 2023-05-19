import { Router } from 'express';
import UserService from '../services/user';

const router = Router();

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

        const userExists = await UserService.exists(email);

        if (userExists) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }

        await UserService.register(email, password);
        res.status(201).json({
            message: `${email} was created successfully!`
        });
    } catch (err) {
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

        const token = await UserService.login(email, password);

        if (!token) {
            res.status(401).json({ message: 'Email or password are wrong.' });
            return;
        }

        res.json({ token });
    } catch (err) {
        next(err);
    }
});

export { router };
