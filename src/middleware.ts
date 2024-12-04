import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  axios
    .get("http://localhost:8000/auth/me")
    .then((res) => console.log(res.data));

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
