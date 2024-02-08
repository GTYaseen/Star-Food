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

    const product = await prisma.product.findMany({
      where: whereClause,
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      product: product,
    });
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
    const product = await prisma.product.create({
      data: body,
    });

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
