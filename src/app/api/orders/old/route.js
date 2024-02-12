import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id") || undefined;
  
    try {
      const orders = await prisma.orders.findMany({
        where: {
          userId: parseInt(id),
          status: {
            in: ["Delivered"]
          }
        },
      });
  
      if (!orders.length){
        return NextResponse.json(
          { error: "Order not found" },
          {
            status: 404,
            success: false,
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }
  
      return NextResponse.json({
          order: orders,
          success: true,
        });
    } catch (error) {
      console.error("Error fetching data:", error);
  
      return NextResponse.json(
        { error: "Internal Server Error" },
        {
          status: 500,
          success: false,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } finally {
      await prisma.$disconnect();
    }
  }
  