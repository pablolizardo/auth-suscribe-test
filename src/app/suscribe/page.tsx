import { auth } from "@/lib/auth";

export default async function Suscribe() {
  const session = await auth();
  if (!session?.user)
    return <p className="text-gray-500">🚨 You are not logged in</p>;

  return (
    <>
      <h1>Suscribe</h1>
    </>
  );
}
