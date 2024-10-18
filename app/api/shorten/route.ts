import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { url, expirationDate, password, customShortCode } =
    await request.json();

  if (expirationDate) {
    const date = new Date(expirationDate);
    if (isNaN(date.getTime()) || date <= new Date()) {
      return NextResponse.json(
        { error: "Expiration date must be a future date" },
        { status: 400 }
      );
    }
  }

  const shortCode = customShortCode ? customShortCode.trim() : nanoid(8);

  if (customShortCode) {
    const existingUrl = await prisma.url.findUnique({ where: { shortCode } });
    if (existingUrl) {
      return NextResponse.json(
        { error: "Short code already exists" },
        { status: 400 }
      );
    }
  }

  try {
    let hashedPassword = null;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const shortenedUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortCode,
        expirationDate: expirationDate ? new Date(expirationDate) : null,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      shortCode: shortenedUrl.shortCode,
      originalUrl: shortenedUrl.originalUrl,
    });
  } catch (error) {
    console.error("Error creating shortened URL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
