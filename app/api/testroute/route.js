import { AuthOptions } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(options);
  console.log("--------------------------------", session, '-------------------------------');

  return NextResponse.json({ message: JSON.stringify(session)});
}
