import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CONTACT_RECIPIENT = "auroha.help@gmail.com";

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

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set; cannot deliver contact submission.");
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Auroha Tejve Site <onboarding@resend.dev>",
    to: CONTACT_RECIPIENT,
    replyTo: email.trim(),
    subject: `New contact form submission from ${name.trim()}`,
    text: [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Company: ${company?.trim() || "-"}`,
      "",
      message.trim(),
    ].join("\n"),
  });

  if (error) {
    console.error("Failed to send contact submission email:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
