import 'reflect-metadata';
import './config/module-alias';

import { app } from '@main/config/app';
import { env } from '@main/config/env';
import { logger } from '@main/config/logger';

app.listen(env.port, () => logger.info(`🔥 Server Listen in: ${env.port}`));
