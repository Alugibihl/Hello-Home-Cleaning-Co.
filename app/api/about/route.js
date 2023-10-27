import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function GET(request) {
  const headers = request.headers.get("authorization");
  try {
    const { user } = JSON.parse(headers);
    return NextResponse.json({message: JSON.stringify(user)})
  } catch(error) {
    return NextResponse.json({ message: "Unauthorized" });
  }

}
