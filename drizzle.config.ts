import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env.local' });

const isDevelopment = process.env.NODE_ENV === 'development';

export default {
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: isDevelopment ? 'sqlite' : 'turso',
  dbCredentials: isDevelopment
    ? { url: 'file:local.db' }
    : {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN,
      },
} satisfies Config;
