import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

function ifRedirect(req: NextRequest) {
  if (req.nextUrl.pathname != "/") {
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.set("accessToken", "", {
      expires: new Date(0),
      path: "/",
    });
    response.cookies.set("refreshToken", "", {
      expires: new Date(0),
      path: "/",
    });
    return response;
  }
  return NextResponse.next();
}

export default async function middleware(req: NextRequest) {
  // const tokenCookie = req.cookies.get("accessToken");
  // const refreshTokenCookie = req.cookies.get("refreshToken");
  // ifRedirect(req);
  // const token = tokenCookie?.value;
  // const refreshToken = refreshTokenCookie?.value;
  // const cookies = [
  //   `accessToken=${token || ""}`,
  //   `refreshToken=${refreshToken || ""}`,
  // ].join("; ");
  // try {
  //   if (token) {
  //     const res = await axios.get("http://localhost:3001/api/validate-token", {
  //       withCredentials: true,
  //       headers: { Cookie: cookies },
  //     });
  //     const response = NextResponse.next();
  //     if (res.status === 200) {
  //       return response;
  //     } else {
  //       if (!refreshTokenCookie || !refreshToken) {
  //         return ifRedirect(req);
  //       }
  //       const res = await axios.post("http://localhost:3001/api/refresh", {
  //         withCredentials: true,
  //       });
  //       if (res.status === 200) {
  //         const setCookieHeader = res.headers["set-cookie"];
  //         if (setCookieHeader) {
  //           setCookieHeader.forEach((cookie) => {
  //             response.headers.append("Set-Cookie", cookie);
  //           });
  //         }
  //         return response;
  //       }
  //       return ifRedirect(req);
  //     }
  //   } else {
  //     return ifRedirect(req);
  //   }
  // } catch (error) {
  //   const response = NextResponse.next();
  //   if (!refreshTokenCookie || !refreshToken) {
  //     return ifRedirect(req);
  //   }
  //   try {
  //     const res = await axios.post("http://localhost:3001/api/refresh", {
  //       withCredentials: true,
  //       headers: { Cookie: cookies },
  //     });
  //     if (res.status === 200) {
  //       const setCookieHeader = res.headers["set-cookie"];
  //       if (setCookieHeader) {
  //         setCookieHeader.forEach((cookie) => {
  //           response.headers.append("Set-Cookie", cookie);
  //         });
  //       }
  //       return response;
  //     }
  //     return ifRedirect(req);
  //   } catch (error) {
  //     return ifRedirect(req);
  //   }
  // }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|home|^/$|.*\\.png$).*)"],
};
