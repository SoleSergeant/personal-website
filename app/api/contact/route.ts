import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Forward via mailto link approach — in production wire up Resend or similar
  // For now, log and return success so the form UX works
  console.log(`Contact form submission from ${name} <${email}>:\n${message}`);

  return NextResponse.json({ success: true });
}
