import apiClient from "@/apiClient/apiClient";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  //   const authHeader = req.headers.get("authorization");
  //   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //     return NextResponse.json({
  //       success: false,
  //       message: "Unauthorized",
  //     });
  //   }
  try {
    const token = cookies().get("token")?.value;
    // const body = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/planner/create?nextWeek=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );
    console.log(response);

    return NextResponse.json({
      success: true,
      message: "Planner created successfully",
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { message: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
