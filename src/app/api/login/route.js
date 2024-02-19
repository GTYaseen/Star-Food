import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET_USER;

function setCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const user = await prisma.users.findUnique({
      where: { username },
    });

    if (!user) {
      const response = NextResponse.json({
        success: false,
        msg: "User not found",
      });
      return setCorsHeaders(response);
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        jwtSecret,
        { expiresIn: "1h" }
      );

      const response = NextResponse.json({
        success: true,
        token: token,
        user: { id: user.id, username: user.username },
      });

      return setCorsHeaders(response);
    } else {
      const response = NextResponse.json(
        { success: false, msg: "Wrong password!" },
        { status: 401 }
      );
      return setCorsHeaders(response);
    }
  } catch (error) {
    console.error("Error during processing:", error);

    if (error instanceof Error && error.code) {
      console.error("Prisma error:", error.code);
    }

    const response = NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );

    return setCorsHeaders(response);
  } finally {
    await prisma.$disconnect();
  }
}
