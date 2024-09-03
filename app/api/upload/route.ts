import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { PassThrough } from 'stream';
 
export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
 
  const blob = await put((filename !== null ? filename : ""), request.body !== null ? request.body : new PassThrough().end(), {
    access: 'public',
  });
 
  return NextResponse.json(blob);
}