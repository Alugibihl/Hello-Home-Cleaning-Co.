import bcrypt from "bcrypt";
import User from "@/app/models/user";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse, userAgent } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const {
        name,
        email,
        password,
        phone,
        address,
    } = body;

    console.log("REQUEST: ", body);

    const hashedPassword = await bcrypt.hash(password, 12);

    await connectMongoDB();
    const newUser = await User.create({
        email,
        name,
        phone,
        address,
        hashedPassword,
    })

    return NextResponse.json(newUser);
}
