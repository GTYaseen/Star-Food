import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import bcrypt from "bcrypt";

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
    const { name, password, phoneNumber, location, username } = await req.json();
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        let result = await prisma.users.create({
            data: {
                name,
                username,
                password: hashedPassword,
                location,
                phoneNumber,
            },
        });
        const response = new Response(
            JSON.stringify({
                "success": true,
                result,
            })
        );
        return setCorsHeaders(response);
    } catch (error) {
        console.error("Error during processing:", error);

        // Log the specific Prisma error if available
        if (error instanceof Error && error.code) {
            console.error("Prisma error:", error.code);
        }

        const response = new Response(
            JSON.stringify({ "success": false, "error": "Internal server error" })
        );
        return setCorsHeaders(response);
    } finally {
        // Close the Prisma client to avoid resource leaks
        await prisma.$disconnect();
    }
}