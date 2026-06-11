import { NextResponse } from "next/server";
import { clearCustomerSession } from "@/lib/customerAuth";

export const runtime = "nodejs";

export async function POST() {
  try {
    await clearCustomerSession();

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("CUSTOMER LOGOUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to logout",
      },
      { status: 500 }
    );
  }
}