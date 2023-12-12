import { connectMongoDB } from "@/libs/mongodb";
import Appointment from "@/app/models/appointments";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { redirect } from "next/dist/server/api-utils";

export async function POST(request) {
  const { user } = await getServerSession(options);

  if (!user) return redirect("/");
  const {
    name,
    date,
    phone,
    address,
    stories,
    rooms,
    pets,
    noTouch,
    focus,
    allergies,
    frequency,
    refSource,
  } = await request.json();

  await connectMongoDB();
  const appointment = await Appointment.create({
    name,
    date,
    phone,
    userId: user.id,
    address,
    stories,
    rooms,
    pets,
    noTouch,
    focus,
    allergies,
    frequency,
    refSource,
  });
  if (appointment)
    return NextResponse.json({ message: "Appointment Created", status: 201 });

  return NextResponse.json({
    error: "Appointment creation failed",
    status: 500,
  });
}

export async function GET() {
  const { user } = await getServerSession(options);

  if (!user || user.role !== "admin") return redirect("/");

  try {
    await connectMongoDB();
    const appointments = await Appointment.find();
    return NextResponse.json({ appointments });
  } catch (error) {
    return NextResponse.json({
      message: "Appointment retrieval failed",
      status: 400
    });
  }
}
