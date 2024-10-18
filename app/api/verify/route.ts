import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password, id } = await req.json();

  const url = await prisma.url.findUnique({
    where: { id },
  });

  if (!url || !url.password) {
    return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
  }

  const isValid = await bcrypt.compare(password, url.password);
  if (isValid) {
    return NextResponse.json({ redirect: url.originalUrl }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }
}
