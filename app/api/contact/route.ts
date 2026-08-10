import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: Partial<ContactPayload>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, company, message } = payload;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  // TODO: wire up email delivery (e.g. Resend, Postmark) or a CRM webhook.
  console.log("New contact submission:", {
    name: name.trim(),
    email: email.trim(),
    company: company?.trim() || null,
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
