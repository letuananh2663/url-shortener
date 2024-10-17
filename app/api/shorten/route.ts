import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { url, expirationDate } = await request.json();

  if (expirationDate) {
    const date = new Date(expirationDate);
    if (isNaN(date.getTime()) || date <= new Date()) {
      return NextResponse.json(
        { error: "Expiration date must be a future date" },
        { status: 400 }
      );
    }
  }

  const shortCode = nanoid(8);

  const shortenedUrl = await prisma.url.create({
    data: {
      originalUrl: url,
      shortCode,
      expirationDate: expirationDate ? new Date(expirationDate) : null,
    },
  });
  return NextResponse.json({ shortCode: shortenedUrl.shortCode });
}
