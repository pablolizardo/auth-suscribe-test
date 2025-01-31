import { User } from "@prisma/client";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const secretkey = new TextEncoder().encode(process.env.AUTH_SECRET);

const cookie = {
  name: "session",
  options: { httpOnly: false, secure: false, sameSite: "lax" as const, path: "/", },
  duration: 24 * 60 * 60 * 1000, // 1 day in milliseconds
};

export const createSession = async (user: User) => {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ user, exp: Math.floor(expires.getTime() / 1000), });
  const cookieStore = await cookies();
  cookieStore.set(cookie.name, session, { ...cookie.options, expires });
};

export const revalidateSession = async (user: User) => {
  "use server";
  await updateSession(user);
  revalidatePath('/profile')
};

export const updateSession = async (user: User) => {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ user, exp: Math.floor(expires.getTime() / 1000), });
  const cookieStore = await cookies();
  cookieStore.set(cookie.name, session, { ...cookie.options, expires });
};

export const verifySession = async (): Promise<{ user: User } | null> => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(cookie.name);
    if (!sessionCookie?.value) { return null; }
    const session = await decrypt(sessionCookie.value);
    if (!session?.user) {
      console.error("Session verification failed: Invalid session data");
      return null;
    }
    return { user: session.user as User };
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes("NEXT_REDIRECT")) {
      console.error("Unexpected session verification error:", error);
    }
    return null;
  }
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(cookie.name);
};


export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("24h") // Use standard time format
    .sign(secretkey);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretkey, { algorithms: ["HS256"], });
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}

