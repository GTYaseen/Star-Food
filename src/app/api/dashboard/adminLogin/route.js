import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET_ADMIN;

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const user = await prisma.admins.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        msg: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        jwtSecret,
        { expiresIn: "1h" }
      );

      return NextResponse.json({
        success: true,
        token: token, // Make sure the token is defined
        user: { id: user.id, username: user.username },
      });
    } else {
      // Handle the case where the password doesn't match
      return NextResponse.json(
        { success: false, msg: "Wrong password!" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during processing:", error);

    if (error instanceof Error && error.code) {
      console.error("Prisma error:", error.code);
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

