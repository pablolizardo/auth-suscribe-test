import NextAuth from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import { verifyPassword } from "@/lib/password"
import { getUserFromDb } from "@/services/users"

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/login', // Error code passed in query string as ?error=
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Asegura que después del inicio de sesión exitoso, 
            // el usuario sea redirigido a la página principal
            return baseUrl;
        },
        async jwt({ token, user }) {
            // Pasa los datos del usuario al token JWT
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            // Añade los datos del usuario a la sesión
            if (token.user) {
                session.user = token.user;
            }
            return session;
        },
    },
    basePath: "/api/auth",
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                let user = null

                // logic to salt and hash password
                // logic to verify if the user exists
                if (!credentials.email || !credentials.password) {
                    throw new Error("Invalid credentials.")
                }
                user = await getUserFromDb(credentials.email as string)
                const pwHash = verifyPassword(credentials.password as string, user?.hashedPassword as string)
                if (!pwHash) {
                    // No user found, so this is their first attempt to login
                    // Optionally, this is also the place you could do a user registration
                    throw new Error("Invalid credentials.")
                }

                // return user object with their profile data
                return user
            },
        }),
    ],
})