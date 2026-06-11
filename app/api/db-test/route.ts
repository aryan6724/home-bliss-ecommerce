import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully",
    });
  } catch (error) {
    console.error("DB TEST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}