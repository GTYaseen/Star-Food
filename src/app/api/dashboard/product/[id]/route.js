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
    const deletedProduct = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      category: deletedProduct,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
