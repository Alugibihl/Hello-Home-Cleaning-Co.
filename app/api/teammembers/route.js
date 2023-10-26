import { connectMongoDB } from "@/libs/mongodb";
import TeamMember from "@/app/models/teammembers";
import { NextResponse } from "next/server";


export async function GET() {
    await connectMongoDB();
    const members = await TeamMember.find();
    return NextResponse.json({ members })
}

export async function POST(request) {
    try {

        const { name, img, about } = await request.json()
        console.log('Data', name)
        await connectMongoDB();
        await TeamMember.create({ name, img, about });
        return NextResponse.json({ message: "Member Created", status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Member Creation Failed", status: 500 })
    }
}
export async function Delete(request) {

    const id = request.nextUrl.searchParams.get("id");

    await connectMongoDB();
    await TeamMember.findByIdAndDelete(id)
    return NextResponse.json({ message: "Member Deleted" })
}
