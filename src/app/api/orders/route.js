import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const userId = req.query.userId;
    const totalPrice = req.query.totalPrice;

    const orders = await prisma.orders.findMany({
      where: {
        id: parseInt(orderId),
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    return NextResponse.json(
      {
        order: order,
        success: true,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}


export async function POST(req) {
  const body = await req.json();
  try {
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
    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
