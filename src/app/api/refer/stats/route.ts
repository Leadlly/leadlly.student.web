import apiClient from "@/apiClient/apiClient";
import { NextResponse } from "next/server";
import { getCookie } from "@/actions/cookie_actions";

export async function GET() {
  try {
    const token = await getCookie("token");

    if (!token) {
      return NextResponse.json(
        {
          message: "No token provided",
        },
        { status: 401 }
      );
    }

    const response = await apiClient.get(`/api/refer/stats`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

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
