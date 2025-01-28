import { saltAndHashPassword } from "@/lib/password"
import { prisma } from "@/lib/prisma"
import { redirect } from 'next/navigation'

export const getUserFromDb = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })
    if (!user) return null
    return user
}

export const createUser = async (formData: FormData) => {
    'use server'
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const country = formData.get('country') as string;
    const password = formData.get('password') as string;
    if (!name || !email || !country || !password) return null

    console.log(name, email, country, password)
    const pwHash = saltAndHashPassword(password as string)
    await prisma.user.create({
        data: {
            name: name as string,
            email: email as string,
            country: country as string,
            hashedPassword: pwHash as string,
        },
    })
    redirect('/')
}
