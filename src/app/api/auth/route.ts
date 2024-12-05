import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");

  return new Response("", {
    status: 200,
    headers: { "Set-Cookie": `accessToken=${token?.value}` },
  });
}
