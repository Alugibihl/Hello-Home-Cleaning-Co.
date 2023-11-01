'use client';
import { HiOutlineTrash } from "react-icons/hi"
import { useRouter } from "next/navigation";

export default function DeleteTeamMemberButton({ id }) {
    const router = useRouter()

    const deleteMemeber = async () => {
        try {
            const res = await fetch(`/api/teammembers?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh()
            }
        } catch (error) { "message", error }

    }
    return (
        <button onClick={deleteMemeber} >
            <HiOutlineTrash size={24} />
        </button>
    )
}
