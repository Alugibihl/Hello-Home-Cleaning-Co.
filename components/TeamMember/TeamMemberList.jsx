'use client'
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { blankProfile } from '../../public/blank-profile-pic.png'
import AddTeamMember from "./AddTeamM/AddTeamMember";
import DeleteTeamMemberButton from "./DeleteTeamM/DeleteTeamM";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

export default function TeamMemberList() {
    const session = useSession()
    const [members, setMembers] = useState('')
    const [loading, setLoading] = useState(false);
    const [deleted, setDeleted] = useState(false)



    useEffect(() => {
        fetch("/api/teammembers", {
            cache: "no-store",
        })
            .then((res) => res.json())
            .then((data) => setMembers(data.members))
            .then(() => setLoading(true))
            .then(() => setDeleted(false))

    }, [deleted])
    let user = session.data?.user
    console.log(user)
    if (!loading) return <h1>Loading</h1>;

    return (
        <>
            <Link href="/team/create">Add New Team Member</Link>
            {members?.map((t) => (
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
                    {user.role == 'admin' ?
                        <div className="flex gap-2">
                            <Link href={`/team/edit/${t._id}`}>
                                <HiPencilAlt size={24} />
                            </Link>
                            <DeleteTeamMemberButton id={t._id} setDeleted={setDeleted} />
                        </div>
                        : <></>
                    }


                </div>
            ))}
        </>
    );
}
