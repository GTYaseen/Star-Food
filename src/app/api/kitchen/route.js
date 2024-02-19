import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

function setCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

export async function GET(req) {
  try {
    let whereClause = {};

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id") || undefined;

    if (id !== undefined) {
      whereClause = {
        id: parseInt(id),
      };
    }

    const kitchen = await prisma.kitchen.findMany({
      where: whereClause,
      orderBy: {
        id: "asc",
      },
    });

    const response = NextResponse.json(
      {
        kitchens: kitchen,
        success: true,
      }
    );

    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error fetching data:", error);

    const response = NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );

    return setCorsHeaders(response);
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const kitchen = await prisma.kitchen.create({
      data: body,
    });

    const response = NextResponse.json({
      success: true,
      kitchen,
    });

    return setCorsHeaders(response);
  } catch (error) {
    const response = NextResponse.json({
      success: false,
      error: error.message,
    });

    return setCorsHeaders(response);
  }
}
