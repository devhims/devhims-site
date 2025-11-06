import 'server-only';

import { db } from '@/db';
import { messages } from '@/db/schema';

interface SaveMessageInput {
  name: string;
  email: string;
  message: string;
  systemInfo: string;
}

export async function saveMessage({
  name,
  email,
  message,
  systemInfo,
}: SaveMessageInput) {
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
