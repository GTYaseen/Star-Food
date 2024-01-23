import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET_USER;
export async function POST(req) {
  const { name, usernameR, passwordR, phoneNumber, location } = await req.json();
  try {
    const hashedPassword = await bcrypt.hash(passwordR, 10);
    let result = await prisma.users.create({
      data: {
        name,
        username: usernameR,
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

    return NextResponse.json({
      success: true,
      token: token,
      user: { id: result.id, username: result.name },
    });
  } catch (error) {
    console.error("Error during processing:", error);
    console.error("Error stack trace:", error.stack);
    // Log the specific Prisma error if available
    if (error instanceof Error && error.code === "P2002") {
      console.error("Prisma error:", error.code);
      return NextResponse.json(
        { success: false, msg: "User already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
