import { ButtonPending } from "@/components/button-pending";
import { ButtonTriggerHook } from "@/components/button-trigger-hook";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { verifySession } from "src/services/session";
import { suscribeUserAction, unSuscribeUserAction } from "src/services/suscription";

const Page = async () => {
  const session = await verifySession();
  if (!session?.user) {
    console.log("No session");
    redirect("/login");
  }
  // 	•	Argentina: MercadoPago.
  // 	•	LATAM (México, Chile, Colombia, Brasil): Stripe.
  // 	•	Internacional (otros países de LATAM): PayPal en USD.
  return (
    <div className="grid gap-4 items-center justify-center">
      Suscribe
      <div className="flex  gap-2">
        <Link className="button" href={"/suscribe/mercado-pago"}>
          Mercado Pago <span className="badge bg-sky-900 text-sky-200">Argentina</span> <ArrowUpRight />
        </Link>
        <Link className="button" href={"/suscribe/stripe"}>
          Stripe <span className="badge bg-yellow-900 text-yellow-200">LATAM</span> <ArrowUpRight />
        </Link>
        <Link className="button" href={"/suscribe/paypal"}>
          Paypal <span className="badge bg-green-900 text-green-200">Internacional</span> <ArrowUpRight />
        </Link>
      </div>
      {!session.user.suscribedAt ? (
        <>
          <ButtonTriggerHook endpoint="http://localhost:3000/api/suscribe" userId={session.user.id}>
            Suscribe Trigger <span className="text-xs font-mono opacity-55">http://localhost:3000/api/suscribe</span>
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
          <ButtonTriggerHook endpoint="http://localhost:3000/api/unsuscribe" userId={session.user.id}>
            Unsuscribe Trigger <span className="text-xs font-mono opacity-55">http://localhost:3000/api/unsuscribe</span>
          </ButtonTriggerHook>

          <form action={unSuscribeUserAction}>
            <input type="hidden" name="userId" value={session.user.id} />
            <ButtonPending type="submit">
              Cancelar suscripcion <X />{" "}
            </ButtonPending>
          </form>
        </>
      )}
    </div>
  );
};

export default Page;
