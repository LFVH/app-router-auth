import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/app/auth/02-stateless-session';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  
  const cookie = cookies().get('session')?.value;
  console.log('Cookie recebido:', cookie);
  const session = await decrypt(cookie);
  console.log('Session:', session);
  console.log('Path:', path);

  // 4. Redirect
  if (isProtectedRoute && !session?.userId) {
    console.log("entrou aqui entao deu problema");
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    console.log("entrou NextResponse.redirect");
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }
console.log("seguiu NextResponse.next()");
  return NextResponse.next();
}
