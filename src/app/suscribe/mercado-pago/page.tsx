import { CreditCard } from 'lucide-react';
import { redirect } from 'next/navigation';
import { createMercadoPagoSuscription } from 'src/services/mercadopago';
import { verifySession } from 'src/services/session';

const Page = async () => {
  const handleSubmit = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const userId = formData.get('userId') as string;
    const suscription = await createMercadoPagoSuscription(email, userId);
    console.log('suscription', suscription);
    redirect(suscription);
  };
  const session = await verifySession();
  const userId = session?.user?.id;
  return (
    <div className="grid justify-center items-center gap-4">
      Mercado Pago
      <form action={handleSubmit}>
        <input type="email" name="email" />
        <input type="text" name="userId" defaultValue={userId} />
        <button className="button" type="submit">
          Suscribirme <CreditCard />
        </button>
      </form>
    </div>
  );
};

export default Page;
