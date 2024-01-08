import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function setCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (query) {
    whereClause = {
      name: {
        contains: query,
      },
    };
  }
  try {
    const kitchen = await prisma.kitchen.findMany({
      orderBy: {
        id: "asc",
      },
    });

    const response = new Response(JSON.stringify(kitchen));
    return setCorsHeaders(response);
  } catch (error) {
    const response = new Response(
      JSON.stringify({
        success: false,
        error: error.message, // Include only the error message for security
      })
    );
    return setCorsHeaders(response);
  }
}

export async function POST(req) {
  const body = await req.json();
  try {
    const kitchen = await prisma.kitchen.create({
      data: body,
    });

    const response = new Response(
      JSON.stringify({
        success: true,
        kitchen,
      })
    );
    return setCorsHeaders(response);
  } catch (error) {
    const response = new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      })
    );
    return setCorsHeaders(response);
  }
}
