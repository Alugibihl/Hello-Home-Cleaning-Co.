"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useEdgeStore } from "@/libs/edgestore"

async function editMember(id, { newName, newImg, newAbout, newPosition }) {

    const res = await fetch(`/api/teammembers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newName, newImg, newAbout, newPosition }),
    });
    if (res.ok) {
        const teamMember = await res.json();
        return teamMember;
    }
}

export default function EditTeamMember({ id, name, img, about, position }) {
    const [newName, setNewName] = useState(name);
    const [newImg, setNewImg] = useState(img);
    const [newAbout, setNewAbout] = useState(about);
    const [newPosition, setNewPosition] = useState(position || "");

    const [file, setFile] = useState("")
    const { edgestore } = useEdgeStore()

    const router = useRouter();

    // useEffect(() => {
    //     if (file) {
    //         console.log(edgestore.myPublicsImages, img)
    //         edgestore.myPublicsImages.upload({
    //             file,
    //             options: {
    //                 replaceTargetUrl: img,
    //             },
    //         }).then(res => (setNewImg(res.url)))
    //         //save your data here
    //     }


    // }, [file,
    //     // newImg
    // ])
    const check = (file) => {
        if (file) {
            console.log(edgestore.myPublicsImages, img)
            edgestore.myPublicsImages.upload({
                file,
                options: {
                    replaceTargetUrl: img,
                },
            }).then(res => (setNewImg(res.url)))
            //save your data here
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await editMember(id, { newName, newImg, newAbout, newPosition });
        router.push("/team");
    };

    return (
        <form onSubmit={handleSubmit} className="session-form">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                        className="block text-gray-700 text-s font-bold mb-2"
                    >Name
                        <input
                            required={true}
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
                    >Position
                        <input
                            required={true}

                            autoComplete="on"
                            name="position"
                            value={newPosition}
                            type="text"
                            onChange={(e) => setNewPosition(e.target.value)}
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
                            required={true}
                            value={newAbout}
                            type="text"
                            onChange={(e) => setNewAbout(e.target.value)}
                            className="resize-none h-40 appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                    </label>
                </div>
            </div>
            {/* <img src={newImg ? newImg : img}></img> */}

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label
                        className="block text-gray-700 text-s font-bold mb-2"

                    >
                        Profile Picture
                        <input
                            name="img"
                            // value={file}
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={(e) => setFile(e.target.files?.[0])}
                            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                    </label>
                </div>
            </div>

            <button
                type="button"
                onClick={async () => check(file)}
                className="mb-4 justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Set New Picture
            </button>
            <button className="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Edit Team Member
            </button>
        </form>
    );
}
