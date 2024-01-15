import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const corsMiddleware = cors({
  origin: "https://star-food-bay.vercel.app",
  methods: ["POST"],
  credentials: true,
});

export default async function POST(req, res) {
  // Apply CORS middleware
  await corsMiddleware(req, res);

  if (req.method === "POST") {
    const { username, password } = await req.body;

    try {
      const user = await prisma.users.findUnique({
        where: { username },
      });

      if (!user) {
        return res.status(404).json({ success: false, msg: "User not found" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign(
          { userId: user.id, username: user.username },
          "user",
          { expiresIn: "1h" }
        );
        const responseBody = {
          success: true,
          token,
          user: { id: user.id, username: user.username },
        };
        return res.status(200).json(responseBody);
      } else {
        return res.status(401).json({ success: false, msg: "Wrong password!" });
      }
    } catch (error) {
      console.error("Error during processing:", error);

      if (error instanceof Error && error.code) {
        console.error("Prisma error:", error.code);
      }

      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}
