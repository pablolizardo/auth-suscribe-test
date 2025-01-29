import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { hashPassword } from "./auth";

export const registerUser = async (formData: FormData) => {
  "use server";
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const country = formData.get("country") as string;
  const password = formData.get("password") as string;
  const hashedPassword = await hashPassword(password);
  await prisma.user.create({
    data: {
      name: name as string,
      email: email as string,
      country: country as string,
      hashedPassword: hashedPassword,
    },
  });
  redirect("/login");
};

export const getUserFromDb = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) return null;
  return user;
};
