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
            const response = new Response(
                JSON.stringify({ success: false, msg: "User not found" })
            );
            return setCorsHeaders(response);
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ username: user.username, id: user.id }, "user");
            const response = new Response(
                JSON.stringify({ success: true, token, user })
            );
            return setCorsHeaders(response);
        } else {
            const response = new Response(
                JSON.stringify({ success: false, msg: "Wrong password!" })
            );
            return setCorsHeaders(response);
        }
    }
    catch (error) {
        console.error("Error during processing:", error);

        // Log the specific Prisma error if available
        if (error instanceof Error && error.code) {
            console.error("Prisma error:", error.code);
        }

        const response = new Response(
            JSON.stringify({ success: false, error: "Internal server error" })
        );
        return setCorsHeaders(response);
    }
}