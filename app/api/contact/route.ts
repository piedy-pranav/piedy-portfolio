import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email(),
  message: z.string().trim().min(1).max(2000),
  company: z.string().optional().default(""), // honeypot — checked (not schema-enforced) below
});

// Simple in-memory rate limit: 3 requests/min per IP. Fine at this scale;
// resets on server restart, which is acceptable for a low-traffic contact form.
const RATE_LIMIT = 3;
const WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many requests. Try again in a minute." },
      { status: 429 }
    );
  }

  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please check your name, email, and message." },
      { status: 400 }
    );
  }

  const { name, email, message, company } = parsed.data;
  if (company) {
    // Honeypot triggered — pretend success so bots don't learn anything.
    return NextResponse.json({ message: "Sent." }, { status: 200 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    // No Resend credentials configured yet — log locally instead of sending,
    // so the form is fully testable in local dev. See INSTRUCTIONS.md §3.
    console.log("[contact] RESEND_API_KEY/CONTACT_TO_EMAIL not set — logging instead of sending:", {
      name,
      email,
      message,
    });
    return NextResponse.json({ message: "Sent." }, { status: 200 });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Piedy Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `New message from ${name}`,
      text: message,
    });
    return NextResponse.json({ message: "Sent." }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Couldn't send right now. Try again shortly." },
      { status: 502 }
    );
  }
}
