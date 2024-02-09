import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") || undefined;

  try {
    const orders = await prisma.orders.findMany({
      where: {
        userId: parseInt(id),
      },
    });

    if (!orders.length){
      return NextResponse.json(
        { error: "Order not found" },
        {
          status: 404,
          success: false,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    return NextResponse.json({
        order: orders,
        success: true,
      });
  } catch (error) {
    console.error("Error fetching data:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
        success: false,
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
