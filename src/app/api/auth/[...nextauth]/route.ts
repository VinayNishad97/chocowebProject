import { authOptions } from "@/src/lib/auth/authOptions";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
