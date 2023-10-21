import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb";
import { options } from "./options";

const handler = NextAuth(options);

export { handler as GET, handler as POST }
