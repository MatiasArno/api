import { model, Schema } from 'mongoose';

const userData = new Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		token: String,
	},
	{ collection: 'users', timestamps: true }
);

export const User = model('User', userData);