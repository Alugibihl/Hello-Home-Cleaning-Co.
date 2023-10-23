import mongoose, { Schema, models } from "mongoose";

const appointmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Appointment = models.Appointment || mongoose.model('Appointment', appointmentSchema);

export default Appointment;
