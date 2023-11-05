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
      <div className="bg-blue-200">
        <div className="flex justify-center">
          <div className="text-6xl">Join Our Team</div>
        </div>
        <div className="flex bg-slate-200 justify-around h-72">
          <div className="flex flex-col justify-center items-center">
            <h2>Reliability</h2>
            <img
              className="rounded w-max h-52"
              src="/pexels-karolina-grabowska-4239091.jpg"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2>Teamwork</h2>
            <img
              src="/pexels-tima-miroshnichenko-6195122.jpg"
              className="rounded w-max h-52"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2>Attention To Detail</h2>
            <img
              src="/pexels-polina-zimmerman-4008518.jpg"
              className="rounded w-max h-52"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h3 className="text-center">
            We are looking for hardworking, reliable, and positive individuals
            to join our growing team of cleaning specialists.{" "}
          </h3>
          <p>Benefits you can look forward to</p>
          <ul>
            <li>Flexible schedule to meet your busy life.</li>
            <li>No prior experience required. We will train you</li>
            <li>Close knit and supportive team</li>
            <li>Skills you can take home with you</li>
          </ul>
          {/* //Modal */}
          <button
            onClick={handleModal}
            className="mb-6 bg-blue-500 w-26 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

        {/* <ResumeForm /> */}
      </div>
    </>
  );
}
