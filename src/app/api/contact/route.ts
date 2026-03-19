import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, company, service, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "name, email, and message are required." },
      { status: 400 }
    );
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const contactEmail = process.env.CONTACT_EMAIL || "hello@yourclient.com";
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    // ── Send via Resend ──────────────────────────────────────────────────────
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Contact Form <noreply@${new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yourclient.com").hostname}>`,
        to: [contactEmail],
        reply_to: email,
        subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
        html: `
          <h2>New contact form submission</h2>
          <table>
            <tr><td><strong>Name</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email</strong></td><td>${email}</td></tr>
            ${company ? `<tr><td><strong>Company</strong></td><td>${company}</td></tr>` : ""}
            ${service ? `<tr><td><strong>Service</strong></td><td>${service}</td></tr>` : ""}
          </table>
          <h3>Message</h3>
          <p style="white-space:pre-wrap">${message}</p>
        `,
        text: `Name: ${name}\nEmail: ${email}\n${company ? `Company: ${company}\n` : ""}${service ? `Service: ${service}\n` : ""}\nMessage:\n${message}`,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }
  } else {
    // ── Fallback: log to console (dev / missing key) ─────────────────────────
    console.log("📧 Contact form submission (RESEND_API_KEY not set):", {
      name,
      email,
      company,
      service,
      message,
    });
  }

  return NextResponse.json({ ok: true });
}
