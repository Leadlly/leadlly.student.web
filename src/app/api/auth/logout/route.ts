import { NextRequest, NextResponse } from 'next/server';
import { AUTH_TOKEN_COOKIE, clearAuthCookieOptions } from '@/lib/auth-cookie';

export async function GET(req: NextRequest) {
  try {
    const res = NextResponse.json({ message: 'Logged Out' });
    
    res.cookies.set(AUTH_TOKEN_COOKIE, '', clearAuthCookieOptions);
    
    return res;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
