import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const res = await axios.post("http://localhost:3001/api/login", body, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  const setCookieHeader = res.headers["set-cookie"];

  const result = NextResponse.json(res.data, { status: 200 });
  if (setCookieHeader) {
    setCookieHeader.forEach((cookie) => {
      result.headers.append("Set-Cookie", cookie);
    });
  }

  return result;
}
