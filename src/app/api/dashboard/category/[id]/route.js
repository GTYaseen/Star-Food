import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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

    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
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
      return NextResponse.json({
        success: false,
        msg: "Cannot delete category with associated products",
        error: error.message,
      });
    }

    // If no associated products, proceed with deletion
    const deletedCategory = await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      category: deletedCategory,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
