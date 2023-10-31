'use client'

import ResumeForm from "@/components/Resume/ResumeForm"


export default function CareersPage() {
    return (
        <>
            <div className="bg-blue-200">
                <div className="flex justify-center">
                    <h1 className="text-6xl">Join Our Team</h1>
                </div>
                <div className="flex bg-slate-200 justify-around">
                    <div>
                        <h2>BLAH BLAH BLAH</h2>
                        <img src="/pexels-karolina-grabowska-4239091.jpg" className="w-max h-52" />
                    </div>
                    <div>
                        <h2 className="flex justify-center">BLAH BLAH BLAH</h2>
                        <img src="/pexels-tima-miroshnichenko-6195122.jpg" className="w-max h-52" />
                    </div>
                    <div>

                        <h2>BLAH BLAH BLAH</h2>
                        <img src="/pexels-polina-zimmerman-4008518.jpg" className="w-max h-52" />
                    </div>
                </div>
                <div className="flex justify-center">
                    <h3>We are looking for experienced cleaners to join our team </h3>
                </div>
                <div className="flex flex-col">
                    <p>Stuff about the cleaning business that they offer</p>
                    <ul>
                        <li>benefits 1</li>
                        <li>benefits 2</li>
                        <li>benefits 3</li>
                    </ul>
                </div>
                <div className="flex justify-center">
                    <ResumeForm />
                </div>
                {/* <button>Apply Now</button> */}
            </div>

        </>)
}
