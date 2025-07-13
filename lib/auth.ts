// @/lib/auth.ts

import { NextAuthOptions, User as NextAuthUser, Account, Profile } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { verifyPassword } from './password-utils';
import connectDB from "@/lib/mongodb";
import User, { IUser } from '@/models/User';
import Institution from '@/models/Institution'; // ✨ NEW: Import Institution model
import mongoose, { Types } from 'mongoose';

// --- Helper Function: generateUniqueUserTag ---
// (Your existing function remains here)
async function generateUniqueUserTag(name: string): Promise<string> {
    await connectDB();
    let baseTag = name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 15) || 'user';
    let userTag = baseTag;
    let counter = 1;
    while (await User.findOne({ userTag }).lean()) {
        const tagSuffix = String(counter);
        const maxBaseLength = 20 - tagSuffix.length;
        if (baseTag.length > maxBaseLength) {
             baseTag = baseTag.substring(0, maxBaseLength);
        }
        userTag = `${baseTag}${tagSuffix}`;
        counter++;
        if (counter > 1000) {
             console.error("Could not generate unique userTag after 1000 attempts for base:", baseTag);
             userTag = `${baseTag}${Date.now()}${Math.floor(Math.random() * 100)}`;
             if (await User.findOne({ userTag }).lean()) {
                throw new Error("Could not generate unique userTag even with fallback.");
             }
             break;
        }
    }
    return userTag;
}
// --- End Helper Function ---

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        // Note: The admin check below only applies to Credentials.
        // You would need separate logic in the `signIn` callback for Google if you
        // want to restrict Google sign-ins to pre-approved admins.
    }),
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials.password) {
                throw new Error('Please provide both email and password.');
            }
            try {
                await connectDB();
                const existingUser = await User.findOne<IUser>({ email: credentials.email }).lean();

                if (!existingUser || !existingUser.password_hash) {
                    throw new Error('Invalid email or password.');
                }

                const isValid = await verifyPassword(credentials.password, existingUser.password_hash);
                if (!isValid) {
                    throw new Error('Invalid email or password.');
                }

                // ==========================================================
                // ✨ NEW: CHECK IF USER IS AN INSTITUTION ADMIN
                // ==========================================================
                // This is the core logic for the admin portal.
                const institution = await Institution.findOne({
                    // User is an admin if they are the owner OR in the admins array
                    $or: [{ owner: existingUser._id }, { admins: existingUser._id }]
                }).lean();

                if (!institution) {
                    // The user's credentials are correct, but they are not authorized
                    // to access any institution portal as an admin.
                    throw new Error('Access Denied: You are not an administrator of an institution.');
                }
                // ==========================================================

                if (!existingUser._id) {
                    throw new Error("Authentication failed: User data is incomplete.");
                }

                console.log(`Admin user ${existingUser.email} for institution ${institution.name} authenticated successfully.`);

                // If all checks pass, return the user object for NextAuth.
                return {
                    id: (existingUser._id as Types.ObjectId).toString(),
                    name: existingUser.name,
                    email: existingUser.email,
                };
            } catch (error: any) {
                console.error('Credentials Authorize Error:', error.message);
                // Re-throw the specific error message to be displayed on the client.
                throw new Error(error.message || 'An unexpected server error occurred.');
            }
        },
    }),
  ],

  session: { strategy: 'jwt' },

  pages: {
    signIn: '/login', // Redirect users to your custom login page
    error: '/login', // Redirect users to login page on error, error message will be in URL query
  },

  callbacks: {
    // --- signIn Callback (Your existing logic) ---
    async signIn({ user, account, profile }) {
        // Your existing signIn logic is good, no changes needed here.
        // It handles new user creation for OAuth providers correctly.
        return true; // Or keep your existing detailed logic
    },

    // --- JWT Callback (Your existing logic) ---
    async jwt({ token, user }) {
        // Your existing JWT logic is good.
        if (user?.id) {
           token.id = user.id;
        }
        return token;
    },

    // --- Session Callback (Modified) ---
    async session({ session, token }) {
        // Add user ID to the session user object
        if (token.id && session.user) {
            session.user.id = token.id as string;
        }

        // ==========================================================
        // ✨ NEW: ADD INSTITUTION INFO TO THE SESSION
        // ==========================================================
        // This makes the institution's ID and name available globally
        // in the session, which is very useful for frontend components.
        if (token.id) {
            try {
                await connectDB();
                const institution = await Institution.findOne({
                    $or: [{ owner: token.id }, { admins: token.id }]
                }).lean();

                if (institution) {
                    // Add a custom property to the session object
                    session.institution = {
                        id: institution._id.toString(),
                        name: institution.name,
                        portalKey: institution.portalKey,
                    };
                }
            } catch (error) {
                console.error("Failed to add institution data to session:", error);
            }
        }
        // ==========================================================
        return session;
    },
  },

  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};
