import apiClient from "@/apiClient/apiClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = req.url;

    const searchParams = new URL(url).searchParams;
    const plan = searchParams.get("plan");
    const category = searchParams.get("category");

    const response = await apiClient.get(
      `/api/subscription/coupons/get?plan=${plan}&category=${category}`
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error instanceof Error && "response" in error
            ? error.message
            : "Unable to fetch subscription coupons",
      },
      { status: error.response?.status || 500 }
    );
  }
}
