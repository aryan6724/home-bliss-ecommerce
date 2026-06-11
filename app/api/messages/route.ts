import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import Message from "@/models/Message";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^[0-9]{10}$/.test(phone);
}

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

    const messages = await Message.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("GET MESSAGES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch messages",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const messageText = String(body.message || "").trim();

    // Honeypot field: real user will never fill this.
    // Bot usually fills all fields.
    const website = String(body.website || "").trim();

    if (website) {
      return NextResponse.json({
        success: true,
        message: "Message submitted successfully",
      });
    }

    if (!name || !email || !phone || !messageText) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
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

    if (messageText.length < 10 || messageText.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          message: "Message must be between 10 and 1000 characters",
        },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({
      messageId: `MSG-${Date.now()}`,
      name,
      email,
      phone,
      message: messageText,
      date: new Date().toLocaleDateString("en-IN"),
      status: "New",
    });

    return NextResponse.json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.error("CREATE MESSAGE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit message",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}