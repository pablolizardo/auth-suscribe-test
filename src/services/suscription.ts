import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { revalidateSession, updateSession } from "./session";

export async function suscribeUserAction(formData: FormData) {
  "use server";
  const userId = formData.get("userId") as string;
  await suscribeUser(userId);
  revalidatePath("/profile");
}

export const suscribeUser = async (userId: string): Promise<void | User> => {
  "use server";
  try {
    if (userId) {
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          suscribedAt: new Date(),
        },
      });
      // await updateSession(user);
      await revalidateSession();
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

export async function unSuscribeUserAction(formData: FormData) {
  "use server";
  const email = formData.get("email") as string;
  await unSuscribeUser(email);
  revalidatePath("/profile");
}

export const unSuscribeUser = async (
  email: string,
): Promise<User | undefined> => {
  "use server";

  try {
    let user;
    if (email) {
      user = await prisma.user.update({
        where: { email },
        data: {
          suscribedAt: null,
        },
      });
      await updateSession(user);
      revalidatePath("/profile");
      return user;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
  }
};

