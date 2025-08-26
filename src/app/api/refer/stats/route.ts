import apiClient from "@/apiClient/apiClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await apiClient.get(`/api/refer/stats`);

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error instanceof Error && "response" in error
            ? error.message
            : "Unable to fetch referral stats",
      },
      { status: error.response?.status || 500 }
    );
  }
}
