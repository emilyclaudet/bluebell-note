import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const messageId = formData.get("messageId") as string | null;
    const order = parseInt(formData.get("order") as string, 10);
    const altText = (formData.get("altText") as string) || "";

    if (!prisma) {
      return NextResponse.json(
        { error: "Database not configured." },
        { status: 503 }
      );
    }

    if (!file || !messageId || isNaN(order)) {
      return NextResponse.json(
        { error: "File, messageId, and order are required." },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, and WebP images are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be under 5MB." },
        { status: 400 }
      );
    }

    const blob = await put(`messages/${messageId}/${file.name}`, file, {
      access: "public",
    });

    const image = await prisma.image.create({
      data: {
        messageId,
        url: blob.url,
        order,
        altText: altText || null,
      },
    });

    return NextResponse.json({ id: image.id, url: blob.url });
  } catch (error) {
    console.error("Failed to upload image:", error);
    return NextResponse.json(
      { error: "Failed to upload image." },
      { status: 500 }
    );
  }
}
