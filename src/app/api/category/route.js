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
        kitchenId: parseInt(id),
      };
    }

    const category = await prisma.category.findMany({
      where: whereClause,
      orderBy: {
        id: "asc",
      },
    });

    const response = NextResponse.json(category);

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
    const category = await prisma.category.create({
      data: body,
    });

    const response = NextResponse.json({
      success: true,
      category,
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
