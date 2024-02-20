import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Function to set CORS headers
function setCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "DELETE, PUT, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  try {
    let category = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });

    const jsonResponse = {
      success: true,
      category,
    };

    return setCorsHeaders(NextResponse.json(jsonResponse));
  } catch (error) {
    const errorResponse = {
      success: false,
      error: error.message,
    };

    return setCorsHeaders(NextResponse.json(errorResponse));
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });

    const jsonResponse = {
      success: true,
      category: deletedProduct,
    };

    return setCorsHeaders(NextResponse.json(jsonResponse));
  } catch (error) {
    const errorResponse = {
      success: false,
      error: error.message,
    };

    return setCorsHeaders(NextResponse.json(errorResponse));
  }
}
