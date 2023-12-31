import User from "@/app/models/user";
import clientPromise, { connectMongoDB } from "@/libs/mongodb";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          // throw new Error("Invalid Credentials");
          return null;
        }
        await connectMongoDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user?.hashedPassword) {
          // throw new Error("Invalid Credentials");
          return null;
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        console.log("USER: ", user);
        if (!isCorrectPassword) {
          // throw new Error("Invalid Credentials");
          return null;
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signIn",
    newUser: "/signUp",
  },
  // debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, session }) {
      console.log("jwt callback", { token, user, session });
      if (user) {
        return {
          ...token,
          id: user._id,
          address: user.address,
          role: user.role,
          phone: user.phone,
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      //   console.log("SESSION: ", session, user ,token);
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.phone = token.phone;
      session.user.address = token.address;
      return session;
    },
  },
  //   adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
};
