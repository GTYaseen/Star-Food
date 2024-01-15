import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

const jwtSecret = process.env.JWT_SECRET;

export async function POST(req) {
  const { username, password } = await req.json();
  try {
    const user = await prisma.users.findUnique({
      where: { username },
    });

    if (!user) {
      const response = new Response(
        JSON.stringify({ success: false, msg: "User not found" }),
        { status: 404 }
      );
      return setCorsHeaders(response);
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        jwtSecret,
        { expiresIn: "1h" }
      );
      const responseBody = {
        success: true,
        token,
        user: { id: user.id, username: user.username },
      };
      const response = new Response(JSON.stringify(responseBody));
      return setCorsHeaders(response);
    } else {
      const response = new Response(
        JSON.stringify({ success: false, msg: "Wrong password!" }),
        { status: 401 }
      );
      return setCorsHeaders(response);
    }
  } catch (error) {
    console.error("Error during processing:", error);

    if (error instanceof Error && error.code) {
      console.error("Prisma error:", error.code);
    }

    const response = new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500 }
    );
    return setCorsHeaders(response);
  } finally {
    await prisma.$disconnect();
  }
}
