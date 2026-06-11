"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type CustomerAuthButtonProps = {
  onClick?: () => void;
};

export default function CustomerAuthButton({
  onClick,
}: CustomerAuthButtonProps) {
  const [user, setUser] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        const data = await response.json();

        if (data.success && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

 if (loading) {
  return (
    <span className="text-sm font-medium text-white/50">
      Account
    </span>
  );
}

  return (
  <Link
    href={user ? "/account" : "/sign-in"}
    onClick={onClick}
    className="text-sm font-medium text-white/75 transition hover:text-white"
  >
    {user ? "Account" : "Sign In"}
  </Link>
);
}