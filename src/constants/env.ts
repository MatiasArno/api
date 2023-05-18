import { load, EnvType } from "ts-dotenv";

type Env = EnvType<typeof schema>;

const schema = {
    NODE_ENV: String,
    PORT: Number,
    MONGO_URI: String,
    JWT_PRIVATE_KEY: String,
};

export let env: Env;

export const loadEnv = (): void => {
    env = load(schema);
};
