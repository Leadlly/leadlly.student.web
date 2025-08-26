import apiClient from "@/apiClient/apiClient";
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "@/actions/cookie_actions";

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
    const subject = searchParams.get("subjectName");
    const standard = searchParams.get("standard");

    const response = await apiClient.get(
      `/api/questionbank/chapter?subjectName=${subject}&standard=${standard}`,
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
            : "Unable to fetch chapters",
      },
      { status: error.response?.status || 500 }
    );
  }
}
