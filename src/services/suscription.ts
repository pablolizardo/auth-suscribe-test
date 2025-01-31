import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { revalidateSession, updateSession } from "./session";

export async function suscribeUserAction(formData: FormData) {
  "use server";
  const userId = formData.get("userId") as string;
  const updatedUser = await suscribeUser(userId);
  await revalidateSession(updatedUser as User);
  revalidatePath("/profile");
}

export async function unSuscribeUserAction(formData: FormData) {
  "use server";
  const email = formData.get("email") as string;
  const updatedUser = await unSuscribeUser(email);
  await updateSession(updatedUser as User);
  revalidatePath("/profile");
}

export const suscribeUser = async (userId: string): Promise<void | User> => {
  try {
    if (userId) {
      const user = await prisma.user.update({ where: { id: userId }, data: { suscribedAt: new Date(), }, });
      revalidatePath("/profile");
      return user;
    } else {
      throw new Error("User ID is required");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const unSuscribeUser = async (email: string,): Promise<User | undefined> => {
  try {
    let user;
    if (email) {
      user = await prisma.user.update({ where: { email }, data: { suscribedAt: null, }, });
      revalidatePath("/profile");
      return user;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
  }
};

