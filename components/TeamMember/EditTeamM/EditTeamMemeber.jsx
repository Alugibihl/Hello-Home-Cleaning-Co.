"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

async function editMember(id, { newName, newImg, newAbout }) {

    const res = await fetch(`/api/teammembers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newName, newImg, newAbout }),
    });
    if (res.ok) {
        const teamMember = await res.json();
        return teamMember;
    }
}

export default function EditTeamMember({ id, name, img, about }) {
    const [newName, setNewName] = useState(name);
    const [newImg, setNewImg] = useState(img);
    const [newAbout, setNewAbout] = useState(about);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editMember(id, { newName, newImg, newAbout });
        router.push("/meettheteam");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg ml-6">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                        className="block text-gray-700 text-s font-bold mb-2"
                    >Name
                        <input
                            autoComplete="on"
                            name="name"
                            value={newName}
                            type="text"
                            onChange={(e) => setNewName(e.target.value)}
                            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                    </label>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                        className="block text-gray-700 text-s font-bold mb-2"

                    >
                        Profile Picture
                        <input
                            name="img"
                            value={newImg}
                            type="text"
                            onChange={(e) => setNewImg(e.target.value)}
                            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                    </label>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                        className="block text-gray-700 text-s font-bold mb-2"
                    >
                        About
                        <textarea
                            name="about"
                            value={newAbout}
                            type="text"
                            onChange={(e) => setNewAbout(e.target.value)}
                            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                    </label>
                </div>
            </div>
            <button className="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Edit Team Member
            </button>
        </form>
    );
}
