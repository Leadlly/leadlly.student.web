// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

import apiClient from '@/apiClient/apiClient';

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    console.log(body, "her is the body")
    const response = await apiClient.post('/api/auth/login', body);
    
    const { token, ...userData } = response.data;
    
    const res = NextResponse.json(userData);
    res.cookies.set('token', token, { httpOnly: true, path: '/', sameSite: 'strict' });
    
    return res;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.response?.status || 500 });
  }
}
