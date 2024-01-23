const { PrismaClient } = require("@prisma/client");
const { NextResponse } = require("next/server");

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id") || undefined;
    const catId = searchParams.get("catId") || undefined;


    let whereClause = {};
    if (id !== undefined) {
      whereClause = {
        kitchenId: parseInt(id),
      };
    }
    if (catId !== undefined) {
      whereClause = {
        id: parseInt(catId),
      };
    }
    const category = await prisma.category.findMany({
      where: whereClause,
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      category: category,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return error instanceof NextResponse ? error : NextResponse.json(
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
  try {
    // Apply middleware
    await CheckAuth(req);

    const body = await req.json();
    const category = await prisma.category.create({
      data: body,
    });

    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}