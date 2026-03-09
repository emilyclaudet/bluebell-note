import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  // Verify cron secret to prevent unauthorized calls
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!prisma) {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 503 }
    );
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Find all messages scheduled for today
    const dueMessages = await prisma.message.findMany({
      where: {
        status: "scheduled",
        deliveryDate: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    let sent = 0;
    let failed = 0;

    for (const message of dueMessages) {
      try {
        const messageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/m/${message.id}`;

        // Send recipient email
        await resend.emails.send({
          from: process.env.EMAIL_FROM || "Bluebell <hello@bluebellnote.com>",
          to: message.recipientEmail,
          subject: `${message.senderName} sent you a Bluebell`,
          html: `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; text-align: center;">
              <p style="color: #5B6AAF; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">A Bluebell for you</p>
              <h1 style="color: #2D2A3E; font-size: 24px; font-weight: 600; margin-bottom: 16px;">${message.recipientName}, someone is thinking of you</h1>
              <p style="color: #2D2A3E; opacity: 0.6; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
                ${message.senderName} wrote you a heartfelt message. It's waiting for you.
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

        // Send sender confirmation
        await resend.emails.send({
          from: process.env.EMAIL_FROM || "Bluebell <hello@bluebellnote.com>",
          to: message.senderEmail,
          subject: `Your Bluebell has been delivered to ${message.recipientName}`,
          html: `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; text-align: center;">
              <p style="color: #5B6AAF; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">Bluebell delivered</p>
              <h1 style="color: #2D2A3E; font-size: 24px; font-weight: 600; margin-bottom: 16px;">Your Bluebell reached ${message.recipientName}</h1>
              <p style="color: #2D2A3E; opacity: 0.6; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
                Your message has been delivered. You can see what they'll see below.
              </p>
              <a href="${messageUrl}" style="display: inline-block; background: #6A9B7B; color: white; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-size: 16px; font-weight: 500;">
                View your message
              </a>
              <p style="color: #2D2A3E; opacity: 0.3; font-size: 12px; margin-top: 40px;">
                Sent with love via Bluebell
              </p>
            </div>
          `,
        });

        // Update status
        await prisma.message.update({
          where: { id: message.id },
          data: { status: "delivered" },
        });

        sent++;
      } catch (emailError) {
        console.error(`Failed to send message ${message.id}:`, emailError);
        failed++;
      }
    }

    return NextResponse.json({
      processed: dueMessages.length,
      sent,
      failed,
    });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json(
      { error: "Cron job failed." },
      { status: 500 }
    );
  }
}
