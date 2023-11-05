
import { HiOutlineTrash } from "react-icons/hi"

export default function DeleteTeamMemberButton({ id, setDeleted }) {
    const deleteMemeber = async () => {
        const confirmed = confirm("Are you sure you want to delete team member?")
        try {
            if (confirmed) {

                const res = await fetch(`/api/teammembers?id=${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    setDeleted(true)
                }
            }
        } catch (error) { "message", error }

    }
    return (
        <button onClick={deleteMemeber} >
            <HiOutlineTrash size={24} />
        </button>
    )
}
