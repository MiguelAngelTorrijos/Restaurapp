import { NextResponse } from 'next/server';
export async function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname == '/') {
    return NextResponse.redirect('/restaurant');
  }
  return NextResponse.next();
}
