export async function GET() {
  const r = await fetch("https://api.ipify.org?format=json");

  const data = await r.json();

  return Response.json(data);
}
