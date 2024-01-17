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

export async function POST(req) {
  const body = await req.json();
  try {
    const kitchen = await prisma.kitchen.create({
      data: body,
    });

    const response = new Response(
      JSON.stringify({
        success: true,
        kitchen,
      })
    );
    return setCorsHeaders(response);
  } catch (error) {
    const response = new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      })
    );
    return setCorsHeaders(response);
  }
}
