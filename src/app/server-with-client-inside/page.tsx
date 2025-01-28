import { auth } from "@/lib/auth";
import ClientComponent from "./client-component";
import { Suspense } from "react";

const Page = async () => {
  const session = await auth();
  if (!session?.user)
    return <p className="text-gray-500">🚨 You are not logged in</p>;

  return (
    <>
      <p>Server with client inside</p>
      <Suspense fallback={<p>Loading...</p>}>
        <ClientComponent />
      </Suspense>
    </>
  );
};

export default Page;
