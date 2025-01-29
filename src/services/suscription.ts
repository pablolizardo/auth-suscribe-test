import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { updateSession } from "./session";

export const suscribeUserAction = async (formData: FormData) => {
  "use server";
  const userId = formData.get("userId") as string;
  const user = suscribeUser(userId);
  return user;
};
export const unSuscribeUserAction = async (formData: FormData) => {
  "use server";
  const userId = formData.get("userId") as string;
  const user = unSuscribeUser(userId);
  return user;
};

export const suscribeUser = async (userId: string): Promise<void | User> => {
  "use server";
  try {
    let user;
    if (userId) {
      user = await prisma.user.update({
        where: { id: userId },
        data: {
          suscribedAt: new Date(),
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

export const unSuscribeUser = async (
  userId: string,
): Promise<User | undefined> => {
  "use server";

  try {
    let user;
    if (userId) {
      user = await prisma.user.update({
        where: { id: userId },
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
