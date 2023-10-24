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
    phone: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

export default Appointment;
