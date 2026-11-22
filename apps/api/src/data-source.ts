import 'dotenv/config';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DataSource } from 'typeorm';

import { ApplicationEntity } from './applications/application.entity.js';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const databaseUrl = process.env.DATABASE_URL;

export default new DataSource({
  type: 'postgres',

  ...(databaseUrl
    ? {
        url: databaseUrl,
      }
    : {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }),

  entities: [ApplicationEntity],

  migrations: [join(currentDirectory, 'migrations', '*.{js,ts}')],

  synchronize: false,
});
