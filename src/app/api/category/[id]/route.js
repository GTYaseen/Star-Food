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
    const updatedCategory = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });

    const response = NextResponse.json({
      success: true,
      category: updatedCategory,
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
    // Check if there are associated products
    const productsInCategory = await prisma.product.findMany({
      where: {
        categoryId: parseInt(id),
      },
    });

    if (productsInCategory.length > 0) {
      const response = NextResponse.json({
        success: false,
        msg: "Cannot delete category with associated products",
        error: error.message,
      });

      return setCorsHeaders(response);
    }

    // If no associated products, proceed with deletion
    const deletedCategory = await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    const response = NextResponse.json({
      success: true,
      category: deletedCategory,
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
