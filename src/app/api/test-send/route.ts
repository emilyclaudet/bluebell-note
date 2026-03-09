import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

// Manual trigger to test email delivery for a specific message.
// Usage: POST /api/test-send with { "messageId": "..." }
// Only available in development or with CRON_SECRET auth.
export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma) {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 503 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "RESEND_API_KEY not configured." },
      { status: 503 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { messageId } = await request.json();

  if (!messageId) {
    return NextResponse.json(
      { error: "messageId is required." },
      { status: 400 }
    );
  }

  const message = await prisma.message.findUnique({
    where: { id: messageId },
  });

  if (!message) {
    return NextResponse.json(
      { error: "Message not found." },
      { status: 404 }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const messageUrl = `${baseUrl}/m/${message.id}`;

  try {
    // Send recipient email
    const recipientResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Bluebell <onboarding@resend.dev>",
      to: message.recipientEmail,
      subject: `${message.senderName} sent you a Bluebell`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; text-align: center;">
          <p style="color: #5B6AAF; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">A Bluebell for you</p>
          <h1 style="color: #2D2A3E; font-size: 24px; font-weight: 600; margin-bottom: 16px;">${message.recipientName}, someone is thinking of you</h1>
          <p style="color: #2D2A3E; opacity: 0.6; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
            ${message.senderName} wrote you a heartfelt message. It&rsquo;s waiting for you.
          </p>
          <a href="${messageUrl}" style="display: inline-block; background: #5B6AAF; color: white; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-size: 16px; font-weight: 500;">
            Read your Bluebell
          </a>
          <p style="color: #2D2A3E; opacity: 0.3; font-size: 12px; margin-top: 40px;">
            Sent with love via Bluebell
          </p>
        </div>
      `,
    });

    // Update status to delivered
    await prisma.message.update({
      where: { id: message.id },
      data: { status: "delivered" },
    });

    return NextResponse.json({
      success: true,
      recipientEmail: message.recipientEmail,
      resendId: recipientResult.data?.id,
    });
  } catch (error) {
    console.error("Test send failed:", error);
    return NextResponse.json(
      { error: "Failed to send email.", details: String(error) },
      { status: 500 }
    );
  }
}
