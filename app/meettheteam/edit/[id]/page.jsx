import EditTeamMember from "@/components/TeamMember/EditTeamM/EditTeamMemeber";


const getTeamMemberById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/teammembers/${id}`, {
            method: 'GET',
            cache: "no-cache",
        });
        if (!res.ok) {
            throw new Error("failed to fetch member")

        }
        return res.json()
    } catch (error) {
        console.log(error, 'AAAAAAA')
    }

}


export default async function EditMember({ params }) {
    const { id } = params;
    const { member } = await getTeamMemberById(id);
    const { name, img, about } = member

    return (
        <EditTeamMember
            id={id} name={name} img={img} about={about}
        />

    )
}
