import "next-auth";

declare module "next-auth" {
    interface User {
        country?: string | null;
    }

    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            country?: string | null;
        }
    }
} 