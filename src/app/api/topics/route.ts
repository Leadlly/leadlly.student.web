import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/apiClient/apiClient";
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
    const chapterId = searchParams.get("chapterId");
    const standard = searchParams.get("standard");

    if (!subject || !chapterId || !standard) {
      return NextResponse.json(
        {
          message: "Missing required parameters",
        },
        { status: 400 }
      );
    }

    const response = await apiClient.get(
      `/api/questionbank/topicwithsubtopic?subjectName=${encodeURIComponent(subject)}&chapterId=${encodeURIComponent(chapterId)}&standard=${encodeURIComponent(standard)}`,
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
            : "Unable to fetch topics",
      },
      { status: error.response?.status || 500 }
    );
  }
}
