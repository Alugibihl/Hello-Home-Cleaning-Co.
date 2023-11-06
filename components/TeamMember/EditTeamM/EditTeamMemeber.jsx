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

    useEffect(() => {
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


    }, [file,
        // newImg
    ])

    const handleSubmit = async (e) => {
        e.preventDefault();

        await editMember(id, { newName, newImg, newAbout, newPosition });
        router.push("/team");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg ml-6">
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
                    >
                        About
                        <textarea
                            name="about"
                            value={newAbout}
                            type="text"
                            onChange={(e) => setNewAbout(e.target.value)}
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
                            required={true}
                            name="about"
                            value={newAbout}
                            type="text"
                            onChange={(e) => setNewAbout(e.target.value)}
                            className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                        {/* <button
                            className="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button" onClick={async => {
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
                            }}> set Picture</button> */}
                        {/* <img src={newImg ? newImg : img}></img> */}
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
                            // value={file}
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={(e) => setFile(e.target.files?.[0])}
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
