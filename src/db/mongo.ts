import mongoose from "mongoose";
import { env } from "../constants/env";

export const configure = () =>
    mongoose.connect(env.MONGO_URI).then(() => console.log("Connected!"));

export const getStatus = () => {
    return {
        name: "MongoDB",
        status: mongoose.connection.readyState === 1 ? "Ok" : "Down",
    };
};
