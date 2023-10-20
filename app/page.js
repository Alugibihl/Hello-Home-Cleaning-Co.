'use client'
import { data } from "browserslist";
import { useSession } from "next-auth/react"
export default function Home() {
  const {status, data} = useSession();
  console.log(status, data)

  return (status === 'authenticated' &&
    <div>
      <img src={data.user.image}/>
      <h1>{data.user.name}</h1>
      <h2>{data.user.email}</h2>
    </div>
  )
}
