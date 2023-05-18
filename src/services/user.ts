import jwt from "jsonwebtoken";

import { User, UserType } from "../models/user";
import { env } from "../constants/env";

export class UserService {
    static async register(email: string, password: string): Promise<void> {
        const newUser = new User({ email, password });
        await newUser.save();
    }

    static async login(
        email: string,
        password: string
    ): Promise<string | null> {
        const user = await User.findOne({ email, password }).lean().exec();

        if (!user) {
            return null;
        }

        //TODO: Cambiar a clave SHA256
        const token = jwt.sign({ user }, env.JWT_PRIVATE_KEY);

        await User.updateOne({ email: user.email }, { token }).exec();

        return token;
    }

    static async exists(email: string): Promise<UserType | null> {
        return User.exists({ email }).lean().exec();
    }

    static async getAllUsers(): Promise<UserType[]> {
        return User.find({}, { email: 1 }).lean().exec();
    }
}
