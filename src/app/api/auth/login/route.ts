// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

import apiClient from '@/apiClient/apiClient';
import { AUTH_TOKEN_COOKIE, authCookieOptions } from '@/lib/auth-cookie';

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();

    const response = await apiClient.post('/api/auth/login', body);
    
    const { token, ...userData } = response.data;
    
    const res = NextResponse.json(userData);
    
    if (token) {
      res.cookies.set(AUTH_TOKEN_COOKIE, token, authCookieOptions);
    }
    
    return res;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.response?.status || 500 });
  }
}
