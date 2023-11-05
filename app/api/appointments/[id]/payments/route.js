import { options } from "@/app/api/auth/[...nextauth]/options";
import Appointment from "@/app/models/appointments";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { user } = await getServerSession(options);
  const { id } = params;

  console.log("___________________________", params)
  const res = await Appointment.findByIdAndUpdate(id, {
    paid: true,
  });
  if (res.ok)
    return NextResponse.json({ message: "Successfully Updated", status: 301 });
  else return NextResponse.json({ message: "Could not Update", status: 400 });
}
