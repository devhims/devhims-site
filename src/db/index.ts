import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const isDevelopment = process.env.NODE_ENV === 'development';

const client = createClient(
  isDevelopment
    ? {
        url: process.env.TURSO_DATABASE_URL_DEV!,
        authToken: process.env.TURSO_AUTH_TOKEN_DEV!,
      }
    : {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
      }
);

export const db = drizzle(client);
