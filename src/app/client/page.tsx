"use client";

import { useSession } from "next-auth/react";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const Page = () => {
  const session = useSession();
  if (!session?.data?.user)
    return <p className="text-gray-500">🚨 You are not logged in</p>;

  return (
    <p>
      Welcome{" "}
      <Suspense fallback={<p>Loading...</p>}>
        {session?.data?.user?.name}
      </Suspense>
    </p>
  );
};

export default Page;
