import 'reflect-metadata';
import './config/module-alias';

import { app } from '@main/config/app';
import { env } from '@main/config/env';

app.listen(env.port, () => console.log(`🔥 Server Listen in: ${env.port}`));
