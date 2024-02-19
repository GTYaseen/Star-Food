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

    const orders = await prisma.orders.findMany({
      where: {
        userId: parseInt(id),
        status: {
          in: ["Pending", "Preparing"]
        }
      },
    });

    if (!orders.length){
      const response = NextResponse.json(
        { error: "Order not found" },
        {
          status: 404,
          success: false,
        }
      );

      return setCorsHeaders(response);
    }

    const response = NextResponse.json({
        order: orders,
        success: true,
      });

    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error fetching data:", error);

    const response = NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
        success: false,
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
    const { items, userId, totalPrice, note, kitchenId, status } = body;

    let order = await prisma.orders.create({
      data: {
        items,
        userId: parseInt(userId),
        totalPrice: parseFloat(totalPrice),
        note,
        kitchenId: parseInt(kitchenId),
        status,
      },
    });

    const response = NextResponse.json({
      success: true,
      order,
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
