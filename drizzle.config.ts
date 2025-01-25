import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env.local' });

const isDevelopment = process.env.NODE_ENV === 'development';

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'turso',
  dbCredentials: isDevelopment
    ? {
        url: process.env.TURSO_DATABASE_URL_DEV!,
        authToken: process.env.TURSO_AUTH_TOKEN_DEV!,
      }
    : {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN,
      },
} satisfies Config;
