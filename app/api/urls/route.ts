import prisma from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  const getIpAddress = async (): Promise<string | null> => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Failed to fetch IP address:", error);
      return null;
    }
  };

  try {
    if (userId) {
      const urls = await prisma.url.findMany({
        where: { userId },
      });
      return NextResponse.json(urls);
    } else {
      const ipAddress = await getIpAddress();

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
