import { connectMongoDB } from "@/libs/mongodb";
import Appointment from "@/app/models/appointments";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function POST(request) {
  const headers = request.headers.get("authorization");
  const user = JSON.parse(headers);
  console.log("user", user, "id", user.id);

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
  console.log("name", name);
  console.log("date", date);
  console.log("phone", phone);
  console.log("address", address);
  console.log("stories", stories);
  console.log("rooms", rooms);
  console.log("pets", pets);
  console.log("noTouch", noTouch);
  console.log("focus", focus);
  console.log("allergies", allergies);
  console.log("frequency", frequency);
  console.log("refSource", refSource);
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

export async function GET(request) {
  const session = await getServerSession(options);
  console.log(
    "----------session___________________________________________",
    session
  );
  try {
    await connectMongoDB();
    const appointments = await Appointment.find();
    return NextResponse.json({ appointments });
  } catch (error) {
    return NextResponse.json({
      error: "Appointment retrieval failed",
      status: 500,
    });
  }
}
