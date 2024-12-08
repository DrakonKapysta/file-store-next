import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookies = request.headers.get("Cookie");

  const refreshResponse = await axios.get("http://localhost:3001/api/refresh", {
    headers: {
      Cookie: cookies,
    },
    withCredentials: true,
  });

  if (refreshResponse.status === 200) {
    const result = NextResponse.json(refreshResponse.data, { status: 200 });
    const setCookieHeader = refreshResponse.headers["set-cookie"];
    if (setCookieHeader) {
      setCookieHeader.forEach((cookie) => {
        result.headers.append("Set-Cookie", cookie);
      });
    }
    return result;
  } else {
    return NextResponse.json("", { status: 401 });
  }
}
