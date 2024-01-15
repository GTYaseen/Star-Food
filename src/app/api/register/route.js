import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
  const { name, username, password, phoneNumber, location } = await req.json();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let result = await prisma.users.create({
      data: {
        name,
        username,
        password: hashedPassword,
        phoneNumber,
        location,
      },
    });

    const token = jwt.sign(
      { userId: result.id, username: result.name },
      jwtSecret,
      { expiresIn: "1h" }
    );

    const response = new Response(
      JSON.stringify({
        success: true,
        result,
        token,
      })
    );
    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error during processing:", error);

    // Log the specific Prisma error if available
    if (error instanceof Error && error.code === "P2002") {
      console.error("Prisma error:", error.code);
      const response = new Response(
        JSON.stringify({ success: false, error: "Username already taken" }),
        { status: 400 } // Set a status code indicating a bad request
      );
      return setCorsHeaders(response);
    }

    const response = new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
        details: error.message,
      }),
      { status: 500 }
    );
    return setCorsHeaders(response);
  }
}
