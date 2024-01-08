import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function setCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*"); 
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function GET(req) {
  try {
    const orders = await prisma.orders.findMany();
    const response = new Response(JSON.stringify(orders));
    return setCorsHeaders(response);
  } catch (error) {
    const response = new Response(
      JSON.stringify({
        success: false,
        error,
      })
    );
    return setCorsHeaders(response);
  }
}

export async function POST(req) {
  const body = await req.json();
  try {
    let order = await prisma.orders.create({
      data: body,
    });

    const response = new Response(
      JSON.stringify({
        success: true,
        order,
      })
    );
    return setCorsHeaders(response);
  } catch (error) {
    const response = new Response(
      JSON.stringify({
        success: false,
        error,
      })
    );
    return setCorsHeaders(response);
  }
}