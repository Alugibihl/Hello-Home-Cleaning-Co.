import mongoose, { Schema } from "mongoose";

const teamMembersSchema = new Schema(
    {

        name: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        about: {
            type: String,
            required: true
        }
    }, { timestamps: true });


const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", teamMembersSchema)

export default TeamMember;
