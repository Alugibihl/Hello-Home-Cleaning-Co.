import User from "@/app/models/user";
import clientPromise, { connectMongoDB } from "@/libs/mongodb";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";


export const options = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }
        await connectMongoDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid Credentials");
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        console.log("USER: ", user);
        if (!isCorrectPassword) throw new Error("Invalid Credentials");
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signIn",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // async jwt({ token, account, profile }) {
    //   // Persist the OAuth access_token and or the user id to the token right after signin
    //   console.log("JWT: ", token, account, profile)
    //   if (account) {
    //     token.accessToken = account.access_token;
    //     token.id = profile.id;
    //   }
    //   return token;
    // },
    // async signIn({ user, account, profile, email, credentials}) {
    //   console.log("SIGN IN: ", user);
    //   return user;
    // },
    async session({ session, user, token }) {
    //   console.log("SESSION: ", session, user ,token);
      session.user.id = token.sub;
      return session;
    },
  },
//   adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
};
