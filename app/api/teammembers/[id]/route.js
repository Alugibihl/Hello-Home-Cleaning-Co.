import { connectMongoDB } from "@/libs/mongodb";
import TeamMember from "@/app/models/teammembers";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    try {

        const { id } = params;
        await connectMongoDB();

        const member = await TeamMember.findOne({ _id: id })
        return NextResponse.json({ member })
    } catch (error) {
        return NextResponse.json({ error: "Team Member retrieval failed" })
    }

}



export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { newName: name, newImg: img, newAbout: about } = await request.json()

        await connectMongoDB();
        await TeamMember.findByIdAndUpdate(id, { name, img, about });

        return NextResponse.json({ message: "Member Successfully Updated", status: 201 })
    } catch (error) {

        return NextResponse.json({ error: "Member Update Failed", status: 500 })
    }
};
