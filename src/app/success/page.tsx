import { PartyPopper } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="grid justify-center items-center gap-4 w-full text-center">
      <p className="text-green-500  mx-auto">
        <PartyPopper className="w-32 h-32" />
      </p>
      <h1 className="text-2xl font-bold">Success</h1>
      <p className="text-lg">Your subscription has been successfully created</p>
      <Link href="/profile" className="button">
        Go to profile
      </Link>
    </div>
  );
};

export default Page;
