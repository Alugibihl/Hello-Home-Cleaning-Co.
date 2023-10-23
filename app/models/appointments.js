import mongoose, { Schema, models } from "mongoose";

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

    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Appointment = models.Appointment || mongoose.model('Appointment', appointmentSchema);

export default Appointment;
