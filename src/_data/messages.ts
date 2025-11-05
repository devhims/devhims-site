import 'server-only';
import { db } from '@/db';
import { messages } from '@/db/schema';

export async function saveMessage({
  name,
  email,
  message,
  systemInfo,
}: {
  name: string;
  email: string;
  message: string;
  systemInfo: string;
}) {
  const [result] = await db
    .insert(messages)
    .values({
      name,
      email,
      message,
      systemInfo,
    })
    .returning();

  return result;
}
