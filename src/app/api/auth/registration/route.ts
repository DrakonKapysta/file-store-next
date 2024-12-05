import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await axios.post(
    "http://localhost:3001/api/registration",
    body,
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
  if (response.status === 200) {
    const result = NextResponse.json(response.data, { status: 200 });
    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      setCookieHeader.forEach((cookie) => {
        result.headers.append("Set-Cookie", cookie);
      });
    }
    return result;
  }
}
