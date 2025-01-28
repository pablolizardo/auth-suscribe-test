/* eslint-disable @next/next/no-img-element */
import { auth } from "@/lib/auth";
export default async function Profile() {
  const session = await auth();

  if (!session?.user)
    return <p className="text-gray-500">🚨 You are not logged in</p>;
  return (
    <div>
      <img src={session?.user?.image ?? "#"} alt="User Avatar" />
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.id}</p>
      <p>{session?.user?.country}</p>
    </div>
  );
}
