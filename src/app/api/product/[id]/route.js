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
    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });

    const response = new Response(JSON.stringify({
      success: true,
      product: updatedProduct,
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
    const deletedProduct = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });

    const response = new Response(JSON.stringify({
      success: true,
      product: deletedProduct,
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
