import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

function setCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  try {
    const UpdatedKitchen = await prisma.kitchen.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });

    const response = NextResponse.json({
      success: true,
      kitchen: UpdatedKitchen,
    });

    return setCorsHeaders(response);
  } catch (error) {
    const response = NextResponse.json({
      success: false,
      error: error.message,
    });

    return setCorsHeaders(response);
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const DeletedKitchen = await prisma.kitchen.delete({
      where: {
        id: parseInt(id),
      },
    });

    const response = NextResponse.json({
      success: true,
      kitchen: DeletedKitchen,
    });

    return setCorsHeaders(response);
  } catch (error) {
    const response = NextResponse.json({
      success: false,
      error: error.message,
    });

    return setCorsHeaders(response);
  }
}
