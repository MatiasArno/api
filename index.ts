// Levanta config de entorno
// Llama a Express. Genera APP.

import env from './src/constants/env';
import app from './src';

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
});
