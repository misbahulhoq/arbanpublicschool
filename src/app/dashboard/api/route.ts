import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = localStorage.getItem("authToken");
  console.log(request.headers.get("authToken"));

  return new Response("Hello, Next.js!", {
    status: 200,
    headers: { authToken: token as string },
  });
}
