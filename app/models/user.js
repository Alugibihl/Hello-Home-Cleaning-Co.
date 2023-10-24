import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
