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

export async function POST(req) {
  const { username, password } = await req.json();
  try {
    const user = await prisma.users.findUnique({
      where: { username },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, msg: "User not found" }),
        { status: 404 }
      );
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        "user", // Replace with a secure secret key
        { expiresIn: "1h" }
      );
      const responseBody = {
        success: true,
        token,
        user: { id: user.id, username: user.username }, // Only include necessary user data
      };
      return new Response(JSON.stringify(responseBody));
    } else {
      return new Response(
        JSON.stringify({ success: false, msg: "Wrong password!" }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during processing:", error);

    // Log the specific Prisma error if available
    if (error instanceof Error && error.code) {
      console.error("Prisma error:", error.code);
    }

    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500 }
    );
  } finally {
    // Close the Prisma client to avoid resource leaks
    await prisma.$disconnect();
  }
}
