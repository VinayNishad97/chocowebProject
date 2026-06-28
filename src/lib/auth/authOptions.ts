// import GoogleProvider from "next-auth/providers/google";
// import { db } from "../db/db";
// import { users } from "../db/schema";
// import { AuthOptions } from "next-auth";

// export const authOptions: AuthOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

//             async profile(profile, token: any) {
//                 console.log("profile", profile);
//                 console.log("token", token);
//                 const data = {
//                     fname: profile.given_name ?? "USER",
//                     lname: profile.family_name ?? "",
//                     email: profile.email,
//                     provider: "GOOGLE",
//                     external_id: profile.sub,
//                     image: profile.picture,
//                 };

//                 try {
//                     const user = await db
//                         .insert(users)
//                         .values(data)
//                         .onConflictDoUpdate({ target: users.email, set: data })
//                         .returning();
//                     return {
//                         ...data,
//                         name: data.fname,
//                         id: String(user[0].id),
//                         role: user[0].role,
//                     };
//                 } catch (error) {
//                     console.log(error);
//                     return {
//                         id: "",
//                     };
//                 }
//             },
//         }),
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     session: {
//         strategy: "jwt",
//     },
//     callbacks: {
//         async session({ session, token }) {
//             if (session.user) {
//                 session.user.id = token.id as string;
//             }
//             return session;
//         },
//         async jwt({ token, user }) {
//             if (user) {
//                 token.role = user.role;
//                 token.id = user.id;
//             }
//             return token;
//         },
//     },
// };

import GoogleProvider from "next-auth/providers/google";
import { db } from "../db/db";
import { users } from "../db/schema";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

            async profile(profile) {
                const data = {
                    fname: profile.given_name ?? "USER",
                    lname: profile.family_name ?? "",
                    email: profile.email,
                    provider: "GOOGLE",
                    external_id: profile.sub,
                    image: profile.picture,
                };

                try {
                    const insertedUsers = await db
                        .insert(users)
                        .values(data)
                        .onConflictDoUpdate({ target: users.email, set: data })
                        .returning();

                    const dbUser = insertedUsers[0];

                    if (!dbUser) {
                        throw new Error(
                            "Failed to insert or update user in database",
                        );
                    }

                    // Return a clean object with explicitly safe string conversion properties
                    return {
                        id: String(dbUser.id),
                        name: data.fname,
                        email: data.email,
                        image: data.image,
                        role: dbUser.role || "user", // Fallback if role is empty
                    };
                } catch (error) {
                    console.error(
                        "Database operation failed in NextAuth Profile:",
                        error,
                    );
                    // Return a safe fallback user instance so NextAuth doesn't break
                    return {
                        id: profile.sub,
                        name: profile.given_name,
                        email: profile.email,
                        image: profile.picture,
                        role: "user",
                    };
                }
            },
        }),
    ],
    // 1. Explicitly enforce JWT storage mechanics
    session: {
        strategy: "jwt",
    },
    // 2. Ensure your secret environment variable is bound directly into the config core
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                // Safely cast or assign custom parameters
                token.role = (user as any).role || "user";
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                (session.user as any).role = token.role as string;
            }
            return session;
        },
    },
};
