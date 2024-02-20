import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

// Function to set CORS headers
function setCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") || undefined;

  try {
    let whereClause = {};

    if (id !== undefined) {
      whereClause = {
        categoryId: parseInt(id),
      };
    }

    const product = await prisma.product.findMany({
      where: whereClause,
      orderBy: {
        id: "asc",
      },
    });

    const jsonResponse = {
      success: true,
      product: product,
    };

    return setCorsHeaders(NextResponse.json(jsonResponse));
  } catch (error) {
    const errorResponse = {
      error: "Internal Server Error",
    };

    return setCorsHeaders(NextResponse.json(errorResponse, {
      status: 500,
    }));
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req) {
  const body = await req.json();
  try {
    const product = await prisma.product.create({
      data: body,
    });

    const jsonResponse = {
      success: true,
      product,
    };

    return setCorsHeaders(NextResponse.json(jsonResponse));
  } catch (error) {
    const errorResponse = {
      success: false,
      error: error.message,
    };

    return setCorsHeaders(NextResponse.json(errorResponse));
  }
}
