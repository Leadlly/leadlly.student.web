import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/apiClient/apiClient";
import { AxiosError } from "axios";

export async function GET(req: NextRequest) {
  try {
    const url = req.url;
    console.log(url);
    const searchParams = new URL(url).searchParams;
    const subject = searchParams.get("subjectName");
    const chapterId = searchParams.get("chapterId");
    const standard = searchParams.get("standard");

    const response = await apiClient.get(
      `/api/questionbank/topicwithsubtopic?subjectName=${subject}&chapterId=${chapterId}&standard=${standard}`
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error instanceof AxiosError
            ? error.response?.data?.message
            : "Unable to fetch topics",
      },
      { status: error.response?.status || 500 }
    );
  }
}
