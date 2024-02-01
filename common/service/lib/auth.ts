import { NextAuthOptions, getServerSession } from "next-auth";
import { loginWithGoogle, signIn } from "./firebase/service";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProfile from "next-auth/providers/google";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user: any = await signIn(credentials!.email);
        if (user) {
          const isCorrect = await compare(credentials!.password, user.password);
          if (isCorrect) {
            return user;
          } else {
            return null;
          }
        }
        return null;
      },
    }),

    GoogleProfile({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET!,

  callbacks: {
    async jwt({ providers, token, user }: any) {
      if ((providers = "credentials")) {
        if (user) {
          token.password = user.password;
          token.name = user.name;
          token.email = user.email;
          token.phone = user.phone;
          token.role = user.role;
        }
        return token;
      }

      if ((providers = "google")) {
        const data = {
          name: user?.name,
          email: user?.email,
          type: "google",
        };

        await loginWithGoogle(data);

        return token;
      }
    },
    async session({ token, session }: any) {
      if ("email" in token) {
        session.email = token.email;
      }

      if ("password" in token) {
        session.password = token.password;
      }

      if ("name" in token) {
        session.name = token.name;
      }

      if ("phone" in token) {
        session.phone = token.phone;
      }

      if ("role" in token) {
        session.role = token.role;
      }
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
