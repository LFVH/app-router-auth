import { NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { images } from '@/drizzle/schema';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const result = await db.select().from(images).execute();
    return NextResponse.status(200).json(result);
  } catch (error) {
    NextResponse.status(500).json({ message: 'Failed to fetch images', error });
  }
}