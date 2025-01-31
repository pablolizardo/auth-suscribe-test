import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { handleCreateMercadoPagoSuscription } from 'src/services/mercadopago';
import { verifySession } from 'src/services/session';

const Page = async () => {
  const session = await verifySession();
  const userId = session?.user?.id;
  return (
    <div className="grid   gap-4 w-full ">
      <Link href="/suscribe">
        <ArrowLeft />
      </Link>
      <form action={handleCreateMercadoPagoSuscription} className=" w-full">
        <label className="text-sky-500">Ingrese su email de Mercado Pago</label>
        <input type="email" name="email" className="border border-sky-500" defaultValue={'test_user_939845802@testuser.com'} />
        <input type="hidden" name="userId" className="opacity-50" readOnly value={userId as string} />
        <button className="button text-black  !bg-sky-500" type="submit">
          Suscribirme <ArrowUpRight />
        </button>
      </form>
    </div>
  );
};

export default Page;
