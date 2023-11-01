'use client'

import ResumeForm from "@/components/Resume/ResumeForm"


export default function CareersPage() {
    return (
        <>
            <div className="bg-blue-200" >
                <div className="flex justify-center">
                    <div className="text-6xl">Join Our Team</div>
                </div>
                <div className="flex bg-slate-200 justify-around h-72">
                    <div className="flex flex-col justify-center items-center">
                        <h2>BLAH BLAH BLAH</h2>
                        <img className="rounded w-max h-52" src="/pexels-karolina-grabowska-4239091.jpg" />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h2 >BLAH BLAH BLAH</h2>
                        <img src="/pexels-tima-miroshnichenko-6195122.jpg" className="rounded w-max h-52" />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h2>BLAH BLAH BLAH</h2>
                        <img src="/pexels-polina-zimmerman-4008518.jpg" className="rounded w-max h-52" />
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <h3 className="text-center">We are looking for hardworking, reliable, and positive individuals to join our growing team of cleaning specialists. </h3>
                    <p>Stuff about the cleaning business that they offer</p>
                    <ul>
                        <li>benefits 1 Hours starting at part time with flexiblity to meet your busy life.</li>
                        <li>benefits 2 No prior experience required. </li>
                        <li>benefits 3</li>
                    </ul>
                    {/* //Modal */}
                    <button className="mb-6 bg-blue-500 w-26 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Apply here</button>
                </div>
                {/* <div className="flex justify-center"> */}
                <ResumeForm />
                {/* </div> */}
            </div>

        </>)
}
