import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    phoneNum: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

export default Appointment;
