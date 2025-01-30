import { CreditCard } from "lucide-react";

const Page = () => {
  return (
    <div className="grid justify-center items-center gap-4">
      Mercado Pago
      <button className="button">
        Suscribirme <CreditCard />
      </button>
    </div>
  );
};

export default Page;
