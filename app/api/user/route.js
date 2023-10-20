import User from "@/app/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {name, email} = await request.json();
    await connectMongoDB();
    await User.create({ name, email });
    return NextResponse.json({message: "User Registered "}, {status: 201});
};
