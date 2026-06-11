import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export const runtime = "nodejs";

type PublicOrderDocument = {
  orderId: string;
  date: string;
  status: string;
  items: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[];
  total: number;
  customer: {
    name: string;
    phone: string;
    city: string;
    paymentMethod: string;
  };
};

function maskPhone(phone: string) {
  if (!phone || phone.length < 4) return "Hidden";
  return `******${phone.slice(-4)}`;
}

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const orderId = searchParams.get("orderId")?.trim();
    const phone = searchParams.get("phone")?.trim();

    if (!orderId || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID and phone number are required",
        },
        { status: 400 }
      );
    }

    const order = await Order.findOne({
      orderId: { $regex: `^${orderId}$`, $options: "i" },
      "customer.phone": phone,
    }).lean();

    if (!order) {
      return NextResponse.json({
        success: true,
        orders: [],
      });
    }

    const publicOrder = {
      orderId: order.orderId,
      date: order.date,
      status: order.status,
      items: order.items,
      total: order.total,
      customer: {
        name: order.customer?.name,
        phone: maskPhone(order.customer?.phone || ""),
        city: order.customer?.city,
        paymentMethod: order.customer?.paymentMethod,
      },
    };

    return NextResponse.json({
      success: true,
      orders: [publicOrder],
    });
  } catch (error) {
    console.error("TRACK ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to track order",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}