import { NextResponse } from "next/server";
import { getCurrentCustomer } from "@/lib/customerAuth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await getCurrentCustomer();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login to view your orders",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const orders = await Order.find({
      "customer.email": user.email,
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("GET CUSTOMER ORDERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}