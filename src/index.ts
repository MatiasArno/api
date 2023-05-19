import express from 'express';
import cors from 'cors';

import * as mongoose from './db/mongo';
import packageJson from '../package.json';

import { router as publicApiRouter } from './routes/public-api';
import { router as apiRouter } from './routes/api';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/public-api', publicApiRouter);
app.use('/api', apiRouter);

mongoose.configure();

app.get('/ping', (req, res, next) => {
    try {
        res.json({ version: packageJson.version });
    } catch (err) {
        next(err);
    }
});

app.get('/ready', (req, res, next) => {
    try {
        res.json(mongoose.getStatus());
    } catch (err) {
        next(err);
    }
});

export default app;
