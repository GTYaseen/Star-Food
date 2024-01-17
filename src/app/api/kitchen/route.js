import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req) {
  try {
    return NextResponse.json({
      success: true,
      kitchens: await prisma.kitchen.findMany(),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}