import { auth } from "@/lib/auth";

export default async function Protected() {
  const session = await auth();
  if (!session) return <p className="text-gray-500"> ❌ Not authenticated</p>;

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
