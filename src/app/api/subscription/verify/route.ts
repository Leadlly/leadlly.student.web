import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";
import apiClient from '@/apiClient/apiClient';

export async function POST(req: NextRequest) {
  try {
    const appRedirectParam = req.nextUrl.searchParams.get('appRedirectURI') || null;

    const formData = await req.formData();
    const razorpay_payment_id = formData.get("razorpay_payment_id") as string | null;
    const razorpay_order_id = formData.get("razorpay_order_id") as string | null;
    const razorpay_signature = formData.get("razorpay_signature") as string | null;


    const token = cookies().get("token")?.value ?? "";

    const backendApiUrl = `/api/subscription/verify?appRedirectURI=${appRedirectParam ? encodeURIComponent(appRedirectParam) : ""}`;
    const response = await apiClient.post(backendApiUrl, {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    }, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`, 
      },
      withCredentials: true, 
    });

    const redirectUrl = response.data;
    console.log("Backend API Response:", redirectUrl);

    return NextResponse.redirect(redirectUrl);

  } catch (error: any) {
    
    return NextResponse.json({
      message: error.response?.data?.message || error.message,
    }, {
      status: error.response?.status || 500
    });
  }
}
