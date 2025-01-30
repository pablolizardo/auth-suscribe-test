import bcrypt from "bcrypt";
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const signIn = async (formData: FormData) => {
  "use server";
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      redirect("/login?error=missing-credentials");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email.toString(),
      },
    }).catch(() => null);

    if (!user) {
      redirect("/login?error=invalid-credentials");
    }

    const isAuthenticated = await isPasswordCorrect(
      password.toString(),
      user.hashedPassword
    ).catch(() => false);

    if (!isAuthenticated) {
      redirect("/login?error=invalid-credentials");
    }

    await createSession(user);
    redirect("/");
  } catch (error) {
    console.error("Sign in error:", error);
    redirect("/login?error=server-error");
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

export const isPasswordCorrect = async (
  pwd: string,
  hsh: string,
): Promise<boolean> => {
  const unhashed = await bcrypt.compare(pwd, hsh);
  return unhashed;
};
