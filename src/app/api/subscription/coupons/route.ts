import { getCookie } from "@/actions/cookie_actions";
import apiClient from "@/apiClient/apiClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = req.url;
    const token = await getCookie("token");

    if (!token) {
      return NextResponse.json(
        {
          message: "No token provided",
        },
        { status: 401 }
      );
    }

    const searchParams = new URL(url).searchParams;
    const plan = searchParams.get("plan");
    const category = searchParams.get("category");

    const response = await apiClient.get(
      `/api/subscription/coupons/get?plan=${plan}&category=${category}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
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
