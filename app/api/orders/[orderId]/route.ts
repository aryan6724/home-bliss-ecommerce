import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import Order from "@/models/Order";

export const runtime = "nodejs";

type RouteProps = {
  params: Promise<{
    orderId: string;
  }>;
};

const allowedStatuses = [
  "Pending Confirmation",
  "Confirmed",
  "Processing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

export async function PATCH(request: Request, { params }: RouteProps) {
  try {
    const isAdmin = await isAdminAuthenticated();

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized access",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const { orderId } = await params;
    const body = await request.json();

    const status = String(body.status || "").trim();

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          message: "Order status is required",
        },
        { status: 400 }
      );
    }

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order status",
        },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update order status",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}