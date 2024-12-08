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

export async function GET(request: Request) {
  const cookies = request.headers.get("Cookie");

  try {
    const response = await axios.get(
      "http://localhost:3001/api/validate-token",
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies,
        },
        withCredentials: true,
      }
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("", { status: 401 });
  }
}
