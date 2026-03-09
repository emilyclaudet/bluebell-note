import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!prisma) {
      return NextResponse.json(
        { error: "Database not configured." },
        { status: 503 }
      );
    }

    const message = await prisma.message.findUnique({
      where: { id },
      include: { images: { orderBy: { order: "asc" } } },
    });

    if (!message) {
      return NextResponse.json(
        { error: "Message not found." },
        { status: 404 }
      );
    }

    // Mark as opened on first view (if delivered)
    if (message.status === "delivered") {
      await prisma.message.update({
        where: { id },
        data: { status: "opened" },
      });
    }

    return NextResponse.json({
      id: message.id,
      senderName: message.senderName,
      recipientName: message.recipientName,
      messageText: message.messageText,
      images: message.images.map((img) => ({
        url: img.url,
        altText: img.altText,
      })),
      status: message.status,
    });
  } catch (error) {
    console.error("Failed to fetch message:", error);
    return NextResponse.json(
      { error: "Failed to fetch message." },
      { status: 500 }
    );
  }
}
