import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

// Middleware for CORS handling
export const corsOptions = {
  origin: "*", // Allow requests from any origin
  methods: ["GET", "POST"], // Allow GET and POST requests
  allowedHeaders: ["Content-Type"], // Allow Content-Type header
};

// Middleware function to handle CORS
export function cors(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", corsOptions.origin);
  res.setHeader("Access-Control-Allow-Methods", corsOptions.methods.join(","));
  res.setHeader("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(","));
  next();
}

export async function GET(req, res) {
  cors(req, res, () => {}); // Apply CORS middleware
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

export async function POST(req, res) {
  cors(req, res, () => {}); // Apply CORS middleware
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

// New approach for configuring API route
export function __nextRouteConfig() {
  return {
    api: {
      bodyParser: {
        sizeLimit: "1mb",
      },
    },
  };
}
