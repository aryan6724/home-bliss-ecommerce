import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Admin logged out successfully",
  });

  response.cookies.set({
    name: "homebliss-admin-session",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}