import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import Order from "@/models/Order";
import Product from "@/models/Product";

export const runtime = "nodejs";

type IncomingOrderItem = {
  id: string;
  quantity: number;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^[0-9]{10}$/.test(phone);
}

function isValidPincode(pincode: string) {
  return /^[0-9]{6}$/.test(pincode);
}

const allowedPaymentMethods = [
  "Cash on Delivery",
  "UPI on Delivery",
  "Card on Delivery",
];

export async function GET() {
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

    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

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

export async function POST(request: Request) {
  const session = await mongoose.startSession();

  try {
    await connectDB();

    const body = await request.json();

    const customer = body.customer;
    const incomingItems: IncomingOrderItem[] = body.items;

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer details are required",
        },
        { status: 400 }
      );
    }

    const name = String(customer.name || "").trim();
    const email = String(customer.email || "").trim().toLowerCase();
    const phone = String(customer.phone || "").trim();
    const city = String(customer.city || "").trim();
    const address = String(customer.address || "").trim();
    const pincode = String(customer.pincode || "").trim();
    const paymentMethod = String(customer.paymentMethod || "").trim();

    if (
      !name ||
      !email ||
      !phone ||
      !city ||
      !address ||
      !pincode ||
      !paymentMethod
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All customer details are required",
        },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 60) {
      return NextResponse.json(
        {
          success: false,
          message: "Name must be between 2 and 60 characters",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address",
        },
        { status: 400 }
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number must be 10 digits",
        },
        { status: 400 }
      );
    }

    if (city.length < 2 || city.length > 60) {
      return NextResponse.json(
        {
          success: false,
          message: "City must be between 2 and 60 characters",
        },
        { status: 400 }
      );
    }

    if (address.length < 10 || address.length > 250) {
      return NextResponse.json(
        {
          success: false,
          message: "Address must be between 10 and 250 characters",
        },
        { status: 400 }
      );
    }

    if (!isValidPincode(pincode)) {
      return NextResponse.json(
        {
          success: false,
          message: "Pincode must be 6 digits",
        },
        { status: 400 }
      );
    }

    if (!allowedPaymentMethods.includes(paymentMethod)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment method",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(incomingItems) || incomingItems.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart items are required",
        },
        { status: 400 }
      );
    }

    session.startTransaction();

    const verifiedItems = [];

    for (const item of incomingItems) {
      const productId = String(item.id);
      const quantity = Number(item.quantity);

      if (!productId) {
        throw new Error("Invalid product ID");
      }

      if (!Number.isInteger(quantity) || quantity <= 0 || quantity > 20) {
        throw new Error("Invalid product quantity");
      }

      const product = await Product.findOne({
        _id: productId,
        isActive: true,
      }).session(session);

      if (!product) {
        throw new Error(`Product not found or inactive: ${productId}`);
      }


      verifiedItems.push({
        id: String(product._id),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    }

    const total = verifiedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const createdOrders = await Order.create(
      [
        {
          orderId: `HB-${Date.now()}`,
          date: new Date().toLocaleDateString("en-IN"),
          customer: {
            name,
            email,
            phone,
            city,
            address,
            pincode,
            paymentMethod,
          },
          items: verifiedItems,
          total,
          status: "Pending Confirmation",
        },
      ],
      { session }
    );

    
    await session.commitTransaction();

    return NextResponse.json({
      success: true,
      order: createdOrders[0],
    });
  } catch (error) {
    await session.abortTransaction();

    console.error("CREATE ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create order",
      },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}