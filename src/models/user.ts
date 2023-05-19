import { model, Schema } from 'mongoose';

export type UserType = {
    email: string;
    password: string;
    token?: string;
};

const userData = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        token: String
    },
    { collection: 'users', timestamps: true }
);

const User = model('User', userData);

export default User;
