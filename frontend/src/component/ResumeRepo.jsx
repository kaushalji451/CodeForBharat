import React from "react";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
const ResumeRepo = () => {
  const [resumes, setresumes] = useState([]);

  useEffect(() => {
    let handleUser = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/candidates/alluser`
      );
      let data = await res.json();
      setresumes(data.data);
    };
    handleUser();
  }, []);

  return (
    <div>
      <Popup
        trigger={<p className="hover:text-black px-4">Candidate Repository</p>}
        contentStyle={{
          borderRadius: "1rem",
          padding: 0,
          maxHeight: "90vh",
          overflowY: "auto",
          width: "90vw",
          position: "relative",
        }}
        modal
        nested
      >
        {(close) => (
          <div className="mx-10 mb-20"> 
            <h1 className="text-3xl text-center font-bold py-5 text-blue-700">
              Candidate Resumes
            </h1>
            <div className="flex flex-col gap-5">
              {resumes.map((candidate, idx) => (
                <div className="bg-blue-100 p-2 hover:bg-blue-200 rounded-md flex justify-between items-center px-5">
                  <p className="font-semibold text-xl">{candidate.name}</p>
                  <a href={candidate.cvUrl} className="bg-blue-500 text-white p-2 rounded-md">
                    View Resume
                  </a>
                </div>
              ))}
            </div>

            <p className="text-center pt-10 opacity-50 text-lg">
              Click "View Resume" on a candidate to see their resume here.
            </p>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default ResumeRepo;
