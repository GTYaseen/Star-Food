function setCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") || undefined;

  try {
    let whereClause = {};

    if (id !== undefined) {
      whereClause = {
        kitchenId: parseInt(id),
      };
    }

    const orders = await prisma.orders.findMany({
      where: whereClause,
      orderBy: {
        id: "asc",
      },
    });

    const jsonResponse = {
      orders: orders,
      success: true,
    };

    return setCorsHeaders(NextResponse.json(jsonResponse));
  } catch (error) {
    console.error("Error fetching data:", error);

    const errorResponse = {
      error: "Internal Server Error",
      success: false,
    };

    return setCorsHeaders(NextResponse.json(errorResponse, { status: 500 }));
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req) {
  const body = await req.json();
  try {
    let order = await prisma.orders.create({
      data: body,
    });

    const jsonResponse = {
      success: true,
      order,
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
