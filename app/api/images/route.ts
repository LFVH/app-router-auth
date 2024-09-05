import { NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { images } from '@/drizzle/schema';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const result = await db.select().from(images).execute();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }, 
    );
  }
}