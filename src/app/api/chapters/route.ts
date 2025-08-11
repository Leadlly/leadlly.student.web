import apiClient from "@/apiClient/apiClient";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = req.url;
    console.log(url);
    const searchParams = new URL(url).searchParams;
    const subject = searchParams.get("subject");
    const standard = searchParams.get("standard");

    const response = await apiClient.get(
      `/api/questionbank/chapter?subjectName=${subject}&standard=${standard}`
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error instanceof AxiosError
            ? error.response?.data?.message
            : "Unable to fetch chapters",
      },
      { status: error.response?.status || 500 }
    );
  }
}
