import { signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function Logout() {
  return (
    <>
      <h1>Logout</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
          redirect("/");
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </>
  );
}
