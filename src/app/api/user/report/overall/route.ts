import { getCookie } from "@/actions/cookie_actions";
import apiClient from "@/apiClient/apiClient";
import { NextResponse } from "next/server";

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

    const response = await apiClient.get(`/api/user/report/overall`, {
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
            : "Unable to fetch overall report",
      },
      { status: error.response?.status || 500 }
    );
  }
}
