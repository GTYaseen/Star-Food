import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET_ADMIN;

function setCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function POST(req) {
  try {
    const { name, username, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    let result = await prisma.admins.create({
      data: {
        name,
        username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { userId: result.id, username: result.name },
      jwtSecret,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({
      success: true,
      token: token,
      user: { id: result.id, username: result.name },
    });

    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error during processing:", error);

    // Log the specific Prisma error if available
    if (error instanceof Error && error.code === "P2002") {
      console.error("Prisma error:", error.code);
      const response = NextResponse.json(
        { success: false, msg: "User already exists" },
        { status: 400 }
      );
      return setCorsHeaders(response);
    }

    const response = NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );

    return setCorsHeaders(response);
  }
}
