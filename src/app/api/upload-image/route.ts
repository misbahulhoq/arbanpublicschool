// app/api/post-data/route.js or route.ts
import { NextRequest, NextResponse } from "next/server";
const imgbbApiKey = process.env.IMGBB_API_KEY;

export async function POST(req: NextRequest) {
  // Access the sensitive API key securely.

  try {
    // Parse the incoming request body
    const body = await req.formData();

    // Make the POST request to the remote server
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data); // Respond with the data from the remote server.
  } catch (error) {
    console.log(error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
