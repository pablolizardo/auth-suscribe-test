import { ButtonPending } from "@/components/button-pending";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "src/services/auth";
import { verifySession } from "src/services/session";

export default async function Server() {
  const session = await verifySession();
  if (!session?.user) {
    console.log("No session");
    redirect("/login");
  }
  return (
    <>
      <ul>
        <li>{session.user.id}</li>
        <li>{session.user.name}</li>
        <li>{session.user.country}</li>
        <li>{session.user.email}</li>
        <li>Usuario desde el {session.user.createdAt.toString()}</li>
        {session.user.suscribedAt ? (
          <li>Es Premium desde {session.user.suscribedAt.toString()}</li>
        ) : (
          <li>No es Premium </li>
        )}
      </ul>
      <Link href="/suscribe" className="button">
        Administrar suscripcion
        <Settings />
      </Link>
      <hr className="opacity-20" />
      <form action={signOut}>
        <ButtonPending type="submit">
          Cerrar sesión <LogOut />
        </ButtonPending>
      </form>
    </>
  );
}
