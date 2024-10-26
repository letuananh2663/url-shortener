import prisma from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  const getIpAddress = (request: NextRequest): string | null => {
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) {
      return forwardedFor.split(",")[0];
    }
    return request.ip || null;
  };

  try {
    if (userId) {
      const urls = await prisma.url.findMany({
        where: { userId },
      });
      return NextResponse.json(urls);
    } else {
      const ipAddress = getIpAddress(request);

      if (!ipAddress) {
        return NextResponse.json(
          { error: "IP address not found" },
          { status: 400 }
        );
      }

      const urls = await prisma.url.findMany({
        where: {
          ipAddress,
        },
        orderBy: {
          createAt: "desc",
        },
        take: 5,
      });

      return NextResponse.json(urls);
    }
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
