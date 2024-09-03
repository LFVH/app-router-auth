import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/drizzle/db';
import { images } from '@/drizzle/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const result = await db.select().from(images).execute();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch images', error });
  }
}