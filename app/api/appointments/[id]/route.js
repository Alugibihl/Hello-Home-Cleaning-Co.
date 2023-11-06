import { connectMongoDB } from "@/libs/mongodb";
import Appointment from "@/app/models/appointments";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";

export async function GET(request, { params }) {
  const { user } = await getServerSession(options);
  const { id } = params;
  try {
    await connectMongoDB();
    const appointment = await Appointment.findById(id);
    if (!(user.role === "admin" || appointment.userId === user.id)) {
      return NextResponse.json({ message: "Unauthorized" });
    }
    return NextResponse.json({ appointment });
  } catch (error) {
    return NextResponse.json({
      error: "Appointment retrieval failed",
      status: 500,
    });
  }
}
export async function PUT(request, { params }) {
  const { user } = await getServerSession(options);
  const { id } = params;
  const appointment = await Appointment.findById(id);

  // Create a list of roles and the fields that each role is allowed to update.
  const roles = {
    admin: {
      fields: [
        "name",
        "date",
        "phone",
        "address",
        "stories",
        "rooms",
        "pets",
        "noTouch",
        "focus",
        "allergies",
        "frequency",
        "refSource",
      ],
    },
    user: {
      fields: [
        "name",
        "phone",
        "address",
        "stories",
        "rooms",
        "pets",
        "noTouch",
        "focus",
        "allergies",
        "frequency",
      ],
    },
  };

  const allowedFields = roles[user.role].fields;
  const requestedFields = Object.keys(request.body);
  const invalidFields = requestedFields.filter(
    (field) => !allowedFields.includes(field)
  );
  if (invalidFields.length > 0) {
    return NextResponse.json({
      message: `You are not authorized to update the following fields: ${invalidFields.join(
        ", "
      )}`,
      status: 403,
    });
  }
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

  const app = await Appointment.findByIdAndUpdate(id, {
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
  });
  console.log("APPOINTMENT UPDATED: ", app);

  if (app) {
    return NextResponse.json({
      message: "Appointment Successfully Updated",
      status: 201,
    });
  }
  return NextResponse.json({
    error: "Appointment update failed",
    status: 500,
  });
}

export async function DELETE(request, { params }) {
  try {
    const { user } = await getServerSession(options);
    const { id } = params;

    const appointment = await Appointment.findById(id);

    if (!(user.role === "admin" || appointment.userId === user.id)) {
      return NextResponse.json({ message: "Unauthorized", status: 403 });
    }
    await connectMongoDB();
    if (appointment.status !== "New" && user.role !== "admin")
      return NextResponse.json({
        message: "Appointment cannot be deleted at this point",
      });
    await Appointment.findByIdAndDelete(id);
    return NextResponse.json({ message: "Appointment Deleted", status: 201 });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to delete appointment",
      status: 500,
    });
  }
}
