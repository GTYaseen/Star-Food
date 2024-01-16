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
  const id = req.params; // Extract id from the path

  let whereClause = {};

  if (id) {
    whereClause = {
      kitchenId: parseInt(id), // Parse id to an integer
    };
  }

  try {
    let category = await prisma.category.findMany({
      where: whereClause,
      orderBy: {
        id: "asc",
      },
    });
    const response = new Response(JSON.stringify(category));
    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
export async function POST(req) {
  const body = await req.json();
  try {
    let category = await prisma.category.create({
      data: body,
    });

    const response = new Response(
      JSON.stringify({
        success: true,
        category,
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
