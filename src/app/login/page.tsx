import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const success = await signIn("credentials", {
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        });
        if (success) {
          redirect("/");
        } else {
          redirect("/login?error=Invalid%20credentials");
        }
      }}
    >
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Sign in</button>
    </form>
  );
}
