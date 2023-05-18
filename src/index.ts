import express, { Router } from "express";
import cors from "cors";

import * as mongoose from "./db/mongo";
import { UserService } from "./services/user";
import authenticate from "./middlewares/authenticate";

// import pkg from '../package.json' assert { type: "json" };
const app = express();

app.use(express.json());
app.use(cors());

mongoose.configure();

// ROUTES

app.get("/ping", (req, res, next) => {
    try {
        res.json({ version: 1 });
    } catch (err) {
        next(err);
    }
});

app.get("/ready", (req, res, next) => {
    try {
        res.json(mongoose.getStatus());
    } catch (err) {
        next(err);
    }
});

// PUNTOS 1
app.post("/public-api/register", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                message: "Email and password are required",
            });
            return;
        }

        const userExists = await UserService.exists(email);

        if (userExists) {
            res.status(409).json({ message: "User already exists" });
            return;
        }

        await UserService.register(email, password);
        res.status(201).json({
            message: `${email} was created successfully!`,
        });
    } catch (err) {
        next(err);
    }
});

// PUNTOS 2
app.post("/public-api/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                message: "Email and password are required.",
            });
            return;
        }

        const token = await UserService.login(email, password);

        if (!token) {
            res.status(401).json({ message: "Email or password are wrong." });
            return;
        }

        res.json({ token });
    } catch (err) {
        next(err);
    }
});

// PUNTO 3
app.get("/api/users", authenticate, async (req, res, next) => {
    try {
        res.json(await UserService.getAllUsers());
    } catch (err) {
        next(err);
    }
});

export { app };
