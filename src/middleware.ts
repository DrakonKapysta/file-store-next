import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { stat } from "fs";

export default async function middleware(req: NextRequest) {
  // const accesstokenCookie = req.cookies.get("accessToken");
  // const refreshTokenCookie = req.cookies.get("refreshToken");
  // if (accesstokenCookie?.value === "" && refreshTokenCookie?.value === "") {
  //   if (req.nextUrl.pathname != "/") {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   } else {
  //     return NextResponse.next();
  //   }
  // }
  // const accessToken = accesstokenCookie?.value;
  // const refreshToken = refreshTokenCookie?.value;
  // const cookies = [
  //   `accessToken=${accessToken || ""}`,
  //   `refreshToken=${refreshToken || ""}`,
  // ].join("; ");
  // try {
  //   const res = await axios.get("http://localhost:3001/api/validate-token", {
  //     withCredentials: true,
  //     headers: { Cookie: cookies },
  //   });
  //   if (res.status === 200) {
  //     return NextResponse.next();
  //   }
  // } catch (error) {
  //   const refreshResponse = await axios
  //     .get("http://localhost:3001/api/refresh", {
  //       headers: {
  //         Cookie: cookies,
  //       },
  //       withCredentials: true,
  //     })
  //     .catch(() => {
  //       if (req.nextUrl.pathname != "/") {
  //         return NextResponse.redirect(new URL("/", req.url));
  //       } else {
  //         return NextResponse.next();
  //       }
  //     });
  //   if (refreshResponse.status === 200) {
  //     const setCookieHeader = refreshResponse.headers["set-cookie"] as string[];
  //     console.log("SET COOKIE HEADER", setCookieHeader);
  //     if (req.nextUrl.pathname != "/") {
  //       const redirectResponse = NextResponse.redirect(new URL("/", req.url));
  //       if (setCookieHeader) {
  //         setCookieHeader.forEach((cookie) => {
  //           redirectResponse.headers.append("Set-Cookie", cookie);
  //         });
  //       }
  //       return redirectResponse;
  //     } else {
  //       return NextResponse.next();
  //     }
  //   } else {
  //     if (req.nextUrl.pathname != "/") {
  //       return NextResponse.redirect(new URL("/", req.url));
  //     } else {
  //       return NextResponse.next();
  //     }
  //   }
  //   if (req.nextUrl.pathname != "/") {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   } else {
  //     return NextResponse.next();
  //   }
  // }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|home|^/$|.*\\.png$).*)"],
};
