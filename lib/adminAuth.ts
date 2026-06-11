import { cookies } from "next/headers";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();

  const adminSession = cookieStore.get("homebliss-admin-session")?.value;

  return (
    Boolean(adminSession) &&
    adminSession === process.env.ADMIN_SESSION_SECRET
  );
}