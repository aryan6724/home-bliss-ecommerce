import crypto from "crypto";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const CUSTOMER_COOKIE_NAME = "homebliss-customer-session";

function getCustomerSecret() {
  const secret = process.env.CUSTOMER_SESSION_SECRET;

  if (!secret) {
    throw new Error("CUSTOMER_SESSION_SECRET is missing in .env.local");
  }

  return secret;
}

export function createCustomerSessionToken(userId: string) {
  const signature = crypto
    .createHmac("sha256", getCustomerSecret())
    .update(userId)
    .digest("hex");

  return `${userId}.${signature}`;
}

export function verifyCustomerSessionToken(token: string) {
  const [userId, signature] = token.split(".");

  if (!userId || !signature) {
    return null;
  }

  const expectedSignature = crypto
    .createHmac("sha256", getCustomerSecret())
    .update(userId)
    .digest("hex");

  if (signature !== expectedSignature) {
    return null;
  }

  return userId;
}

export async function getCurrentCustomer() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CUSTOMER_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const userId = verifyCustomerSessionToken(token);

  if (!userId) {
    return null;
  }

  await connectDB();

  const user = await User.findById(userId).select("-passwordHash");

  if (!user) {
    return null;
  }

  return user;
}

export async function setCustomerSession(userId: string) {
  const cookieStore = await cookies();

  const token = createCustomerSessionToken(userId);

  cookieStore.set(CUSTOMER_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearCustomerSession() {
  const cookieStore = await cookies();

  cookieStore.delete(CUSTOMER_COOKIE_NAME);
}