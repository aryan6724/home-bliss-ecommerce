import { NextResponse } from "next/server";
import { getCurrentCustomer } from "@/lib/customerAuth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await getCurrentCustomer();

    if (!user) {
      return NextResponse.json({
        success: true,
        user: null,
      });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("GET CURRENT CUSTOMER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user",
      },
      { status: 500 }
    );
  }
}