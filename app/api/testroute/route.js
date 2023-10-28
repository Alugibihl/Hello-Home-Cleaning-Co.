import { AuthOptions } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET() {
  const { user } = await getServerSession(options);
  console.log(
    "--------------------------------",
    user,
    "-------------------------------"
  );

  return NextResponse.json({ message: JSON.stringify(user) });
}
