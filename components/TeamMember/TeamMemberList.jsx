'use client'
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { blankProfile } from '../../public/blank-profile-pic.png'
import AddTeamMember from "./AddTeamM/AddTeamMember";
import DeleteTeamMemberButton from "./DeleteTeamM/DeleteTeamM";

const getTeamMemberList = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/teammembers", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch Team Members");
        }

        return res.json()
    } catch (error) {
        console.log("Error loading Team Members: ", error);
    }
};

export default async function TeamMemberList() {
    const { members } = await getTeamMemberList();

    return (
        <>
            <AddTeamMember />
            {members.map((t) => (
                <div
                    key={t._id}
                    className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
                >
                    <div>
                        <h2 className="font-bold text-2xl">{t.name}</h2>
                        <img
                            src={t.img}
                            // className=""
                            alt={t.name}
                        // onError={(e) => { e.currentTarget.src = blankProfile }}
                        >
                        </img>
                        <div>{t.about}</div>
                    </div>

                    <div className="flex gap-2">
                        <Link href={`/meettheteam/edit/${t._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                        <DeleteTeamMemberButton id={t._id} />
                    </div>
                </div>
            ))}
        </>
    );
}
