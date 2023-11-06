"use client";
import { useSession } from "next-auth/react";
import { useEdgeStore } from "@/libs/edgestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function AddTeamMember() {
    const [name, setName] = useState('');

    const [img, setImg] = useState('');
    const [position, setPosition] = useState('')
    const [about, setAbout] = useState('');

    const session = useSession();

    const router = useRouter();
    const userEmail = session.data.user.email
    const confirmBooking = true
    
    const [file, setFile] = useState("")
    // const [urls, setUrls] = useState('')
    const { edgestore } = useEdgeStore()


    const router = useRouter();
    console.log(file)

    const check = (file) => {
        if (file) {
            console.log(edgestore.myPublicsImages)
            edgestore.myPublicsImages.upload({ file })
                .then(res => setImg(res.url))
            //save your data here
        }
        return true
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        // check(file)
        const res = await fetch("/api/teammembers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, img, about, position }),
        });
        if (res.ok) {
            const teamMember = await res.json();
            router.push("/team");
            // return teamMember;
        }
        const response = await fetch('/api/send', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, userEmail, confirmBooking })
        })
        console.log(confirmBooking, "+++++++++++++++++++++++")
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
                            autoComplete="on"
                            name="name"
                            value={name}
                            required={true}

                            type="text"
                            onChange={(e) => setName(e.target.value)}
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
                            autoComplete="on"
                            name="position"
                            value={position}
                            required={true}

                            type="text"
                            onChange={(e) => setPosition(e.target.value)}
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
                            value={about}
                            type="text"
                            onChange={(e) => setAbout(e.target.value)}
                            className="resize-none h-40 appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                className="mb-4 justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Set Picture
            </button>
            <button type="submit" className="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Create Team Member
            </button>
        </form>
        // {/* <div>
        //             {urls?.url && <Link href={urls.url} target="_blank">URL</Link>}
        //             {urls?.thumbnailUrl && <Link href={urls.thumbnailUrl} target="_blank">URL</Link>}

        //         </div> */}
    );
}
