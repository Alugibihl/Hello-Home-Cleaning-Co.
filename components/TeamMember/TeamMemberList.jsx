"use client";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import blankProfile from "../../public/blank-profile-pic.png";
import AddTeamMember from "./AddTeamM/AddTeamMember";
import DeleteTeamMemberButton from "./DeleteTeamM/DeleteTeamM";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@/components/Loding";




export default function TeamMemberList() {
  const session = useSession();
  const [members, setMembers] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    fetch("/api/teammembers", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setMembers(data.members))
      .then(() => setLoading(true))
      .then(() => setDeleted(false));
  }, [deleted]);

  let user = session.data?.user;
  if (!loading) return <Loading />

  return (
    <>
      <div className="pt-2">

        {user && user.role == "admin" ? (
          <div className="p-3">
            <Link
              className="border-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4 "
              href="/team/create"
            >
              Add New Team Member
            </Link>
          </div>
        ) : (
          <></>
        )}
        {members?.map((t) => (
          <div
            key={t._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div className="flex">
              <div className="w-72 h-72">
                <img
                  src={t.img}
                  className="rounded-full h-full w-full"
                  alt={t.name}
                  onError={(e) => {
                    e.currentTarget.src = blankProfile.src;
                  }}
                ></img>
              </div>
              <div className="flex flex-col justify-center pl-4 font-serif">
                <h2 className="font-bold text-2xl pb-2">{t.name}</h2>
                <ul>
                  <li className="font-bold pb-1">{t.position}</li>
                  <li className="whitespace-break-spaces">{t.about}</li>
                </ul>
              </div>
            </div>
            {user && user.role == "admin" ? (
              <div className="flex gap-2">
                <Link href={`/team/edit/${t._id}`}>
                  <HiPencilAlt size={24} />
                </Link>
                <DeleteTeamMemberButton id={t._id} urlD={t.img} setDeleted={setDeleted} />
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </>
  );

}
