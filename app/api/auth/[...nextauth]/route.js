import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/libs/mongodb";
import { options } from "./options";

export const handler = NextAuth(options);

export { handler as GET, handler as POST }
