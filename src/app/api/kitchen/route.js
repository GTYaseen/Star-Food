import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
function setCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function GET(req) {
  try {
    return setCorsHeaders(
      NextResponse.json({
        success: true,
        kitchens: await prisma.kitchen.findMany(),
      })
    );
  } catch (error) {
    return setCorsHeaders(
      NextResponse.json({
        success: false,
        error: error.message,
      })
    );
  }
}
