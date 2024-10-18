import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { url, expirationDate, password } = await request.json();

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
