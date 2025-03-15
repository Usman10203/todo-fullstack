import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },

    providers: [
        // CredentialsProvider({
        //     credentials: {
        //         email: {},
        //         password: {},
        //     },
        //     async authorize(credentials) {
        //         if (credentials === null) return null;

        //         try {
        //             const user = await User.findOne({
        //                 email: credentials?.email
        //             })
        //             console.log(user);
        //             if (user) {
        //                 const isMatch = await bcrypt.compare(
        //                     credentials.password,
        //                     user.password
        //                 );

        //                 if (isMatch) {
        //                     return user;
        //                 } else {
        //                     throw new Error("Email or Password is not correct");
        //                 }
        //             } else {
        //                 throw new Error("User not found");
        //             }
        //         } catch (error) {
        //             throw new Error(error);
        //         }
        //     },
        // }),
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.password) {
                    throw new Error("User not found");
                }

                const isMatch = await bcrypt.compare(credentials.password, user.password);

                if (!isMatch) {
                    throw new Error("Invalid email or password");
                }

                return { id: user.id, name: user.name, email: user.email };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),

    ],
});
