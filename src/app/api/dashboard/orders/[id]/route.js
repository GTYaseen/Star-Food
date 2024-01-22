import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  try {
    let order = await prisma.orders.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const deletedOrder = await prisma.orders.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      order: deletedOrder,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
