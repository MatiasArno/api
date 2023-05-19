import { load, EnvType } from 'ts-dotenv';

type Env = EnvType<typeof schema>;

const schema = {
    NODE_ENV: String,
    PORT: Number,
    MONGO_URI: String,
    JWT_PRIVATE_KEY: String
};

const env: Env = load(schema);

export default env;
