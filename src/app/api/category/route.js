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
  const cat = searchParams.get("cat");
  const query = searchParams.get("query");

  let whereClause = {};

  if (query) {
    whereClause = {
      name: {
        contains: query,
      },
    };
  }
  let category = await prisma.category.findMany({
    where: cat
      ? {
          categoryId: parseInt(cat),
          ...whereClause,
        }
      : whereClause,
    orderBy: {
      id: "asc",
    },
  });
  const response = new Response(JSON.stringify(category));
  return setCorsHeaders(response);
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
