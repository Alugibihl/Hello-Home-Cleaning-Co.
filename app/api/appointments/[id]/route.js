import { connectMongoDB } from "@/libs/mongodb";
import Appointment from "@/app/models/appointments";
import { NextResponse } from "next/server";
import User from "@/app/models/user";

export async function GET(request, { params }) {
    try {
        const { id } = params;
        await connectMongoDB();
        const appointment = await Appointment.findById(id);
        return NextResponse.json({ appointment })
    } catch (error) {
        return NextResponse.json({ error: "Appointment retrieval failed", status: 500 });
    }
}

export async function PUT(request, { params }) {

    try {
        const { id } = params;
        const { newName: name, newDate: date, newPhoneNum: phoneNum, newAddress: address, newStories: stories, newRooms: rooms, newPets: pets, newNoTouch: noTouch, newFocus: focus, newAllergies: allergies, newFrequency: frequency, newRefSource: refSource, newScheduled: scheduled } = await request.json()
        await connectMongoDB();
        await Appointment.findByIdAndUpdate(id, { name, date, phoneNum, address, stories, rooms, pets, noTouch, focus, allergies, frequency, refSource, scheduled });
        return NextResponse.json({ message: "Appointment Successfully Updated", status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Appointment update failed", status: 500 });
    }
}
export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        await connectMongoDB()
        await Appointment.findByIdAndDelete(id)
        return NextResponse.json({ message: "Appointment Deleted", status: 201 })
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to delete appointment", status: 500 })
    }
}
