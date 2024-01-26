import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const userId = req.query.userId;

    const orders = await prisma.orders.findMany({
      where: {
        userId: parseInt(userId),
      },
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
};

export async function POST(req) {
  const body = await req.json();
  try {
    let order = await prisma.orders.create({
      data: body,
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