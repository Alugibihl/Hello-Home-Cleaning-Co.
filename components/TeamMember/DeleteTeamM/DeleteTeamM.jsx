'use-client'
import { HiOutlineTrash } from "react-icons/hi"
import { useEdgeStore } from '@/libs/edgestore'


export default function DeleteTeamMemberButton({ id, setDeleted, urlD }) {
    const { edgestore } = useEdgeStore()
    const deleteMemeber = async () => {
        try {
            await edgestore.myPublicsImages.delete({
                url: urlD,
            });
            const res = await fetch(`/api/teammembers?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setDeleted(true)
            }
        } catch (error) { console.log("message", error) }

    }
    return (
        <button onClick={deleteMemeber} >
            <HiOutlineTrash size={24} />
        </button>
    )
}
