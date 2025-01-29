import { verifySession } from "src/services/session";

export default async function Home() {
  const session = await verifySession();
  return (
    <>
      <p>
        {session?.user
          ? `Hola ${session.user.name}`
          : "Inicia Sesíon o registrate"}
      </p>
    </>
  );
}
