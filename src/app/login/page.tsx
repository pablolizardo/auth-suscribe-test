import { ButtonPending } from "@/components/button-pending";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { signIn } from "src/services/auth";

export default function LoginPage() {
  return (
    <>
      <form action={signIn}>
        <input name="email" type="email" required />
        <input name="password" type="password" required />
        <ButtonPending type="submit">Sign in</ButtonPending>
      </form>
      <Link href="/register" className="button">
        Register <UserPlus />
      </Link>
    </>
  );
}
