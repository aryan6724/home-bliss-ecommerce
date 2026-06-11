import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const username = body.username;
    const password = body.password;

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admin credentials",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Admin login successful",
    });

    response.cookies.set({
      name: "homebliss-admin-session",
      value: process.env.ADMIN_SESSION_SECRET || "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Admin login failed",
      },
      { status: 500 }
    );
  }
}