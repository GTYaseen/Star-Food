const { PrismaClient } = require("@prisma/client");
const { NextResponse } = require("next/server");

const prisma = new PrismaClient();

function setCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

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

    const response = NextResponse.json({
      success: true,
      category: category,
    });

    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    const response = error instanceof NextResponse ? error : NextResponse.json(
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

export async function POST(req) {
  try {
    // Apply middleware
    await CheckAuth(req);

    const body = await req.json();
    const category = await prisma.category.create({
      data: body,
    });

    const response = NextResponse.json({
      success: true,
      category,
    });

    return setCorsHeaders(response);
  } catch (error) {
    const response = NextResponse.json({ success: false, error: error.message });
    return setCorsHeaders(response);
  }
}
