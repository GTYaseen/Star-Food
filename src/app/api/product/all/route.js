export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") || undefined;

  try {
    let whereClause = {};

    if (id !== undefined) {
      whereClause = {
        kitchenId: parseInt(id),
      };
    }

    const product = await prisma.product.findMany({
      where: whereClause,
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      product: product,
    });
  } catch (error) {
    console.error("Error fetching data:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
