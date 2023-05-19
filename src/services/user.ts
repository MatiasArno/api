import jwt from 'jsonwebtoken';
import User, { UserType } from '../models/user';
import env from '../constants/env';

interface Pagination<T> {
    content: T;
    pagination: {
        totalItems: number;
        totalPages: number;
        page: number;
        size: number;
    };
}

export default class UserService {
    static async register(email: string, password: string): Promise<void> {
        const newUser = new User({ email, password });

        await newUser.save();
    }

    static async login(email: string, password: string): Promise<string | null> {
        const user = await User.findOne({ email, password }).lean().exec();

        if (!user) return null;

        const token = jwt.sign({ user: { email } }, env.JWT_PRIVATE_KEY);

        await User.updateOne({ email: user.email }, { token }).exec();

        return token;
    }

    static async exists(email: string): Promise<UserType | null> {
        return User.exists({ email }).lean().exec();
    }

    static async findOne(email: string): Promise<UserType | null> {
        return User.findOne({ email }).lean().exec();
    }

    static async getAllUsers(): Promise<UserType[]> {
        return User.find({}, { email: 1 }).lean().exec();
    }

    static async getUsersByPage(page = 1, size = 10): Promise<Pagination<UserType[]>> {
        const result = await User.find({}, { email: 1 })
            .skip((page - 1) * size)
            .limit(size);

        const totalUsers = await User.count();
        const totalPages = Math.ceil(totalUsers / size);

        const resultObj = {
            totalItems: totalUsers,
            totalPages: totalPages,
            page,
            size
        };

        return { content: result, pagination: resultObj };
    }
}
