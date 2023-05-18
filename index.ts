// Levanta config de entorno
// Llama a Express. Genera APP.

import { env, loadEnv } from "./src/constants/env";

loadEnv();

import { app } from "./src";

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
});
