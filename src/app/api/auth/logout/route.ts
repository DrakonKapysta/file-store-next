import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");

  return NextResponse.redirect(new URL("/", req.url));
}
