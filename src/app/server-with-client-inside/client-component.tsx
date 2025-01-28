"use client";

import { useSession } from "next-auth/react";

export default function ClientComponent() {
  const { data: session, status } = useSession();

  return <p>Welcome {session?.user?.name}</p>;
}
