import { connectMongoDB } from "@/libs/mongodb";
import Appointment from "@/app/models/appointments";
import { NextResponse } from "next/server";
import User from "@/app/models/user";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const appointments = await Appointment.find({userId: id})
    return NextResponse.json({ appointments });
  } catch (error) {
    return NextResponse.json({
      error: "Appointment retrieval failed",
      status: 500,
    });
  }
}
