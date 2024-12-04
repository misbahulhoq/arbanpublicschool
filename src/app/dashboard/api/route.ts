export async function GET() {
  const token = localStorage.getItem("authtToken");

  return new Response("Hello, Next.js!", {
    status: 200,
    headers: { authToken: token as string },
  });
}
