import apiClient from "@/apiClient/apiClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = req.url;

    const searchParams = new URL(url).searchParams;
    const subject = searchParams.get("subjectName");
    const standard = searchParams.get("standard");

    const response = await apiClient.get(
      `/api/questionbank/chapter?subjectName=${subject}&standard=${standard}`
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
