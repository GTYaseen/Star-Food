// pages/api/your-api-route.js
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const { NextResponse } = require("next/server");

const prisma = new PrismaClient();

async function CheckAuth(req) {
  return new Promise((resolve, reject) => {
    let token = req.headers.token;
    jwt.verify(token, "samurai", function (err, decoded) {
      if (decoded) {
        resolve();
      } else {
        reject(
          NextResponse.json(
            { success: false, msg: "Unauthorized!" },
            { status: 401 }
          )
        );
      }
    });
  });
}

export async function GET(req) {
  try {
    // Apply middleware
    await CheckAuth(req);

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id") || undefined;

    let whereClause = {};
    if (id !== undefined) {
      whereClause = {
        id: parseInt(id),
      };
    }

    const kitchen = await prisma.kitchen.findMany({
      where: whereClause,
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(
      {
        kitchens: kitchen,
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
    return error instanceof NextResponse
      ? error
      : NextResponse.json(
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
    const kitchen = await prisma.kitchen.create({
      data: body,
    });

    return NextResponse.json({
      success: true,
      kitchen,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
