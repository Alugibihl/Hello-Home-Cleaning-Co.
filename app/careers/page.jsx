"use client";

import Modal from "@/components/Modal/Modal";
import ResumeForm from "@/components/Resume/ResumeForm";
import { useState } from "react";

export default function CareersPage() {
  const [showApply, setShowApply] = useState(false);
  const modalFunctions = {
    setShowApply: (shown) => setShowApply(shown),
  };
  const handleModal = () => {
    setShowApply(true);
  };

  return (
    <>
      <div className="">
        {/* <div className="flex justify-center">
                    <div className="text-6xl font-serif">Join Our Team</div>
                </div> */}
        <div className="relative w-full">
          <img src="/join11.jpg" className="h-fit min-w-full" alt="join3"></img>
          <div className="absolute top-1/3 left-0 right-0 mx-auto text-center font-serif">
            <h1 className="text-6xl text-white">Join Our Team</h1>
            <br></br>
            <h2 className="text-center text-white text-2xl">
              We are looking for hardworking, reliable, and positive individuals
              to join our growing team of cleaning specialists
            </h2>
          </div>
        </div>
        <div className=" font-serif flex flex-col justify-center items-center bg-light-blue pb-32">
          <p className="text-xl font-bold pt-2">
            Benefits you can look forward to:
          </p>
          <ul className="text-xl text-center p-5">
            <li className="p-1">Flexible schedule to meet your busy life.</li>
            <li className="p-1">
              No prior experience required. We will train you
            </li>
            <li className="p-1">Close knit and supportive team</li>
            <li className="p-1">Skills you can take home with you</li>
          </ul>
          <button
            onClick={handleModal}
            className="mt-6 bg-feather-blue hover:bg-highlight-orange font-bold py-2 px-4 rounded"
          >
            Apply here
          </button>
        </div>
        {showApply && (
          <Modal
            component={ResumeForm}
            close={(shown) => setShowApply(shown)}
            modalFunctions={modalFunctions}
          />
        )}
      </div>
    </>
  );
}

//   return (
//     <>
//       <div className="bg-blue-200">
//         <div className="flex justify-center">
//           <div className="text-6xl">Join Our Team</div>
//         </div>
//         <div className="flex bg-slate-200 justify-around h-72">
//           <div className="flex flex-col justify-center items-center">
//             <h2>Reliability</h2>
//             <img
//               className="rounded w-max h-52"
//               src="/pexels-karolina-grabowska-4239091.jpg"
//             />
//           </div>
//           <div className="flex flex-col justify-center items-center">
//             <h2>Teamwork</h2>
//             <img
//               src="/pexels-tima-miroshnichenko-6195122.jpg"
//               className="rounded w-max h-52"
//             />
//           </div>
//           <div className="flex flex-col justify-center items-center">
//             <h2>Attention To Detail</h2>
//             <img
//               src="/pexels-polina-zimmerman-4008518.jpg"
//               className="rounded w-max h-52"
//             />
//           </div>
//         </div>

//         <div className="flex flex-col justify-center items-center">
//           <h3 className="text-center">
//             We are looking for hardworking, reliable, and positive individuals
//             to join our growing team of cleaning specialists.{" "}
//           </h3>
//           <p>Benefits you can look forward to</p>
//           <ul>
//             <li>Flexible schedule to meet your busy life.</li>
//             <li>No prior experience required. We will train you</li>
//             <li>Close knit and supportive team</li>
//             <li>Skills you can take home with you</li>
//           </ul>
//           {/* //Modal */}
//           <button
//             onClick={handleModal}
//             className="mb-6 bg-blue-500 w-26 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Apply here
//           </button>
//         </div>
//         {showApply && (
//           <Modal
//             component={ResumeForm}
//             close={(shown) => setShowApply(shown)}
//             modalFunctions={modalFunctions}
//           />
//         )}

{
  /* <div className="flex flex-col justify-center items-center">
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
                    </div> */
}
