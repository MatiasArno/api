import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from './src/models/user.js';

const env = dotenv.config();
process.env = env.parsed;

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected!'));

const newUser = new User({
    email: 'test@gmail.com',
    password: 166516511
});

newUser.save().then().catch(console.dir)

// User.find({}).then((response) => console.log(response));