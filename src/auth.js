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
                session.user.id = token.id;  // Ensure session has user ID
            }
            return session;
        },
        async jwt({ token, user, account }) {
            if (account?.provider === "google") {
                // Check if user exists in DB
                let existingUser = await prisma.user.findUnique({
                    where: { email: token.email },
                });

                if (!existingUser) {
                    // Create user in DB if not found
                    existingUser = await prisma.user.create({
                        data: {
                            email: token.email,
                            name: token.name,
                            id: token.sub,  // Google user ID
                        },
                    });
                }

                token.id = existingUser.id;  // Assign DB ID to session
            } else if (user) {
                token.id = user.id; // Credentials users already have an ID
            }

            return token;
        },
    },

    session: {
        strategy: 'jwt',
    },

    providers: [

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
