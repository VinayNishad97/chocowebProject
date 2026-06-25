import { DefaultSession } from "next-auth";

declare module "next-auth" {
    // 1. Extend the User interface returned by the provider profile callback
    interface User {
        id: string;
        role?: string;
    }

    // 2. Extend the Session interface used in your application code
    interface Session {
        user: {
            id: string;
            role?: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    // 3. Extend the JWT interface used in the jwt callback
    interface JWT {
        id: string;
        role?: string;
    }
}
