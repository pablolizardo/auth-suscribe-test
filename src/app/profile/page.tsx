import { ButtonPending } from "@/components/button-pending";
import { ButtonTriggerHook } from "@/components/button-trigger-hook";
import { CreditCard, LogOut, X } from "lucide-react";
import { redirect } from "next/navigation";
import { signOut } from "src/services/auth";
import { verifySession } from "src/services/session";
import {
  suscribeUserAction,
  unSuscribeUserAction,
} from "src/services/suscription";

export default async function Server() {
  const session = await verifySession();
  if (!session?.user) {
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
      {!session.user.suscribedAt ? (
        <>
          <ButtonTriggerHook
            endpoint="http://localhost:3000/api/suscribe"
            userId={session.user.id}
          >
            Suscribe Trigger
          </ButtonTriggerHook>
          <form action={suscribeUserAction}>
            <input type="hidden" name="userId" value={session.user.id} />
            <ButtonPending type="submit">
              Pasate a Premium por $5 <CreditCard className="text-amber-500" />
            </ButtonPending>
          </form>
        </>
      ) : (
        <>
          <ButtonTriggerHook
            endpoint="http://localhost:3000/api/unsuscribe"
            userId={session.user.id}
          >
            Unsuscribe Trigger
          </ButtonTriggerHook>

          <form action={unSuscribeUserAction}>
            <input type="hidden" name="userId" value={session.user.id} />
            <ButtonPending type="submit">
              Cancelar suscripcion <X />{" "}
            </ButtonPending>
          </form>
        </>
      )}
      <hr className="opacity-20" />
      <form action={signOut}>
        <ButtonPending type="submit">
          Cerrar sesión <LogOut />
        </ButtonPending>
      </form>
    </>
  );
}
