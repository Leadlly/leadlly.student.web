import apiClient from "@/apiClient/apiClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = req.url;

    const searchParams = new URL(url).searchParams;
    const pricingType = searchParams.get("pricingType");

    const response = await apiClient.get(
      `/api/subscription/pricing/get?pricingType=${pricingType}`
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error instanceof Error && "response" in error
            ? error.message
            : "Unable to fetch subscription pricing",
      },
      { status: error.response?.status || 500 }
    );
  }
}
