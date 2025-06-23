import React from "react";
import "../candidateDashboard.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditCandidateBySelf from "../component/EditCandidateBySelf";
import ViewCandidateQ from "../component/ViewCandidateQ"

const CandidateDashboard = () => {
  let location = useLocation();
  let userid = location.state.id;
  const navigate = useNavigate();
  const [candidate, setcandidate] = useState(null);

  let handleUser = async () => {
    let data = await fetch(
      `${import.meta.env.VITE_API_URL}/candidates/${userid}`
    );
    let result = await data.json();
    console.log(result);
    setcandidate(result);
  };

  useEffect(() => {
    handleUser();
  }, [userid]);

  let handleLogout = () => {
    navigate("/login");
  };

  // Map status to Tailwind bg color classes
  const statusClasses = {
    accepted: "bg-blue-600",
    "in-review": "bg-yellow-500",
    review: "bg-green-600",
    selected: "bg-green-500",
    "offer-sent": "bg-purple-600",
    rejected: "bg-red-600",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 flex justify-center items-start py-12 px-4">
      {candidate != null && (
        <div className="bg-white rounded-3xl shadow-lg max-w-3xl w-full p-12 animate-fadeInUp max-sm:p-4">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-semibold text-blue-800 text-center select-none max-sm:text-2xl">
              {candidate.name}
            </h1>
            <div className="flex gap-2">
              <EditCandidateBySelf candidate={candidate} handleUser={handleUser} />
              <button
                className={
                  "inline-block px-5 py-1 rounded-full font-semibold text-white select-none bg-blue-600"
                }
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          <section
            aria-label="Candidate Information"
            className="bg-blue-50 rounded-xl p-8 shadow-md mb-10 animate-fadeInUp animation-delay-300"
          >
            <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-500 select-none mb-6">
              Your Information
            </h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm hover:bg-blue-100 hover:shadow-md transition-all cursor-default select-text">
                <span className="font-semibold text-gray-600">Email:</span>
                <span className="text-blue-700 max-w-[60%] truncate">
                  {candidate.email}
                </span>
              </li>
              <li className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm hover:bg-blue-100 hover:shadow-md transition-all cursor-default select-text">
                <span className="font-semibold text-gray-600">Username:</span>
                <span className="text-blue-700 max-w-[60%] truncate">
                  {candidate.username}
                </span>
              </li>
              <li className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm hover:bg-blue-100 hover:shadow-md transition-all cursor-default select-text">
                <span className="font-semibold text-gray-600">Phone No:</span>
                <span className="text-blue-700 max-w-[60%] truncate">
                  +91 {candidate.phoneno}
                </span>
              </li>
              <li className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm hover:bg-blue-100 hover:shadow-md transition-all cursor-default select-text">
                <span className="font-semibold text-gray-600">Gender:</span>
                <span className="text-blue-700 max-w-[60%] truncate">
                  {candidate.gender}
                </span>
              </li>
              <li className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm hover:bg-blue-100 hover:shadow-md transition-all cursor-default select-text">
                <span className="font-semibold text-gray-600">
                  Date of Birth:
                </span>
                <span className="text-blue-700 max-w-[60%] truncate">
                  {candidate.dateOfBirth}
                </span>
              </li>
              <li className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm hover:bg-blue-100 hover:shadow-md transition-all cursor-default select-text">
                <span className="font-semibold text-gray-600">Degree:</span>
                <span className="text-blue-700 max-w-[60%] truncate">
                  {candidate.degree}
                </span>
              </li>
              <li className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm hover:bg-blue-100 hover:shadow-md transition-all cursor-default select-text">
                <span className="font-semibold text-gray-600">Status:</span>
                <span>
                  <span
                    className={`inline-block px-5 py-1 rounded-full font-semibold text-white select-none ${
                      statusClasses[candidate.status]
                    }`}
                    title={`Current application status: ${candidate.status}`}
                  >
                    {candidate.status.charAt(0).toUpperCase() +
                      candidate.status.slice(1)}
                  </span>
                </span>
              </li>
              <li className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm hover:bg-blue-100 hover:shadow-md transition-all cursor-default select-text">
                <span className="font-semibold text-gray-600">Applied On:</span>
                <span className="text-blue-700 max-w-[60%] truncate">
                  {new Date(candidate.appliedOn).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </li>
               <li className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm hover:bg-blue-100 hover:shadow-md transition-all cursor-default select-text">
                <span className="font-semibold text-gray-600">Resume:</span>
                <a href={candidate.cvUrl} target="_blank" className="inline-block px-5 py-1 rounded-full font-semibold text-white select-none bg-blue-600">
                  View
                </a>
              </li>
            </ul>
          </section>
          <section
            aria-label="Candidate Information"
            className="bg-blue-50 rounded-xl p-8 shadow-md mb-10 animate-fadeInUp animation-delay-300"
          >
            <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-500 select-none mb-6">
              Your Score Details
            </h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm hover:bg-blue-100 hover:shadow-md transition-all cursor-default select-text">
                <span className="font-semibold text-gray-600">Total Questions</span>
                <span className="text-blue-700 max-w-[60%] truncate">
                  {candidate.score.totalQuestion}
                </span>
              </li>
              <li className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm hover:bg-blue-100 hover:shadow-md transition-all cursor-default select-text">
                <span className="font-semibold text-gray-600">Correct Answers</span>
                <span className="text-blue-700 max-w-[60%] truncate">
                  {candidate.score.correctAnswer}
                </span>
              </li>
              <li className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm hover:bg-blue-100 hover:shadow-md transition-all cursor-default select-text">
                <span className="font-semibold text-gray-600">Score in Presentage</span>
                <span className="text-blue-700 max-w-[60%] truncate">
                  {candidate.score.percentage}%
                </span>
              </li>
              <li className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm hover:bg-blue-100 hover:shadow-md transition-all cursor-default select-text">
                <span className="font-semibold text-gray-600">View Result In Details</span>
                <span className="text-blue-700 max-w-[60%] truncate cursor-pointer">
                   <ViewCandidateQ selectedAnswers={candidate.score.selectedAnswers} userId={candidate._id}/>
                </span>
              </li>
            
              
              
              



            </ul>
          </section>
        </div>
      )}
    </main>
  );
};

export default CandidateDashboard;
