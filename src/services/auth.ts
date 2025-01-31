import bcrypt from "bcrypt";
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const signIn = async (formData: FormData) => {
  "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (email && password) {
    const user = await prisma.user.findUnique({ where: { email: email, }, });
    if (user) {
      const isAuthenticated = await isPasswordCorrect(password, user.hashedPassword,);
      if (isAuthenticated) {
        console.log("logged");
        await createSession(user);
        redirect("/profile");
      }
    }
    redirect("/login?error=true");
  }
};

export const signOut = async () => {
  "use server";
  await deleteSession();
  redirect("/");
};

export const hashPassword = async (pwd: string): Promise<string> => {
  const hashed = await bcrypt.hash(pwd, 10);
  return hashed;
};

export const isPasswordCorrect = async (pwd: string, hsh: string,): Promise<boolean> => {
  const unhashed = await bcrypt.compare(pwd, hsh);
  return unhashed;
};
