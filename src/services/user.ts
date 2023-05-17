import { User } from '../models/user.js';

export class UserService {
	static async register(data: Object) {
		const newUser = new User(data);
		await newUser.save();
	}

	static async login(email, password) {
		const user = await User.findOne({ email, password });
		return user;
	}

	static async findUsers() {
		return User.find({});
	}
}