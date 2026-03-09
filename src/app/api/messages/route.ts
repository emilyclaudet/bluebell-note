import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      senderName,
      senderEmail,
      recipientName,
      recipientEmail,
      relationshipType,
      messageText,
      deliveryOption,
      deliveryDate,
    } = body;

    // Validation
    if (
      !senderName?.trim() ||
      !senderEmail?.trim() ||
      !recipientName?.trim() ||
      !recipientEmail?.trim() ||
      !relationshipType ||
      !messageText?.trim()
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Calculate delivery date
    let finalDeliveryDate: Date;
    if (deliveryOption === "surprise") {
      const daysFromNow = Math.floor(Math.random() * 30) + 1;
      finalDeliveryDate = new Date();
      finalDeliveryDate.setDate(finalDeliveryDate.getDate() + daysFromNow);
    } else {
      if (!deliveryDate) {
        return NextResponse.json(
          { error: "Delivery date is required." },
          { status: 400 }
        );
      }
      finalDeliveryDate = new Date(deliveryDate + "T00:00:00Z");
      if (finalDeliveryDate <= new Date()) {
        return NextResponse.json(
          { error: "Delivery date must be in the future." },
          { status: 400 }
        );
      }
    }

    if (!prisma) {
      // No database — return mock response for prototype mode
      return NextResponse.json({
        id: "demo",
        deliveryDate: finalDeliveryDate.toISOString(),
      });
    }

    const message = await prisma.message.create({
      data: {
        senderName: senderName.trim(),
        senderEmail: senderEmail.trim(),
        recipientName: recipientName.trim(),
        recipientEmail: recipientEmail.trim(),
        relationshipType,
        messageText: messageText.trim(),
        deliveryDate: finalDeliveryDate,
      },
    });

    return NextResponse.json({
      id: message.id,
      deliveryDate: message.deliveryDate,
    });
  } catch (error) {
    console.error("Failed to create message:", error);
    return NextResponse.json(
      { error: "Failed to create message." },
      { status: 500 }
    );
  }
}
