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
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id") || undefined;

    let whereClause = {};

    if (id !== undefined) {
      whereClause = {
        kitchenId: parseInt(id),
      };
    }

    const product = await prisma.product.findMany({
      where: whereClause,
      orderBy: {
        id: "asc",
      },
    });

    const response = NextResponse.json({
      success: true,
      product: product,
    });

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
