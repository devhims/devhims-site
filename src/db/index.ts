import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const isDevelopment = process.env.NODE_ENV === 'development';

const client = createClient(
  isDevelopment
    ? { url: 'file:local.db' }
    : {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
      }
);

export const db = drizzle(client);
