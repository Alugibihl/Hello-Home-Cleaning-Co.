import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    stories: {
      type: String,
      required: true,
    },
    rooms: {
      type: String,
      required: true,
    },
    pets: {
      type: String,
      required: true,
    },
    noTouch: {
      type: String,
      default: "None",
    },
    areaInterest: {
      type: String,
      default: "None",
    },
    allergies: {
      type: Boolean,
      default: false,
    },
    frequency: {
      type: String,
      enum: ["2", "3", "4", "None"],
      default: "None",
    },
    refSource: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["New", "Scheduled", "Past"],
      default: "New",
    },
    paid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Check", "Card"],
    },
    price: {
      type: Number,
      default: 200,
    },
  },
  { timestamps: true }
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;
