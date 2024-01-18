import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
      options: {
        ssl: {
          rejectUnauthorized: true,
        },
      },
    },
  },
});

export async function GET(req) {
  try {
    return NextResponse.json({
      success: true,
      orders: await prisma.orders.findMany(),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

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
