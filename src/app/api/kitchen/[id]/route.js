import { PrismaClient } from "@prisma/client";

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
    const updatedkitchen = await prisma.kitchen.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });

    const response = new Response(JSON.stringify({
      success: true,
      kitchen: updatedkitchen,
    }));

    return setCorsHeaders(response);
  } catch (error) {
    const response = new Response(JSON.stringify({
      success: false,
      error: error.message,
    }));

    return setCorsHeaders(response);
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const deletedkitchen = await prisma.kitchen.delete({
      where: {
        id: parseInt(id),
      },
    });

    const response = new Response(JSON.stringify({
      success: true,
      kitchen: deletedkitchen,
    }));

    return setCorsHeaders(response);
  } catch (error) {
    const response = new Response(JSON.stringify({
      success: false,
      error: error.message,
    }));

    return setCorsHeaders(response);
  }
}