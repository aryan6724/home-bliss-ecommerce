import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export const runtime = "nodejs";

type RouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(request: Request, { params }: RouteProps) {
  try {
    await connectDB();

    const { slug } = await params;

    const product = await Product.findOne({
      slug,
      isActive: true,
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("GET PRODUCT BY SLUG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}