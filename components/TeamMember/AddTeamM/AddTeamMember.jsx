"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

async function createMemeber({ name, img, about }) {
    const res = await fetch("/api/teammembers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, img, about }),
    });
    if (res.ok) {
        const teamMember = await res.json();
        console.log(teamMember)
        return teamMember;
    }
}

export default function AddTeamMember() {
    // const session = useSession();
    const [name, setName] = useState();
    const [img, setImg] = useState();
    const [about, setAbout] = useState();

    // const userId = session.data?.user?.id;
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const teamMember = await createMemeber({ name, img, about });
        console.log(teamMember)
        router.refresh();
        // router.push("/about");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg ml-6">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label
                        class="block text-gray-700 text-s font-bold mb-2"
                        for="grid-name"
                    >
                        Name
                    </label>
                    <input
                        value={name}
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label
                        class="block text-gray-700 text-s font-bold mb-2"
                        for="grid-date"
                    >
                        Profile Picture
                    </label>
                    <input
                        value={img}
                        type="text"
                        onChange={(e) => setImg(e.target.value)}
                        className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label
                        class="block text-gray-700 text-s font-bold mb-2"
                        for="grid-phone"
                    >
                        About
                    </label>
                    <textarea
                        value={about}
                        type="text"
                        onChange={(e) => setAbout(e.target.value)}
                        className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                </div>
            </div>
            <button className="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Create Team Member
            </button>
        </form>
    );
}
