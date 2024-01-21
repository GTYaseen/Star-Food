import { PrismaClient } from "@prisma/client";
import next from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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

    return NextResponse.json({
      success: true,
      kitchen: UpdatedKitchen,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
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

    return NextResponse.json({
      success: true,
      kitchen: DeletedKitchen,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
