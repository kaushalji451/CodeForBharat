import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const ViewCandidateQ = ({ selectedAnswers, userId }) => {
  const [questions, setquestions] = useState([]);

  useEffect(() => {
    const handleQuestions = async () => {
      const data = await fetch(
        `${import.meta.env.VITE_API_URL}/questions?userId=${userId}`
      );
      const result = await data.json();
      setquestions(result.questions);
    };
    handleQuestions();
  }, [selectedAnswers, userId]);

  const TickIcon = () => (
    <svg
      className="w-5 h-5 text-blue-600 ml-auto flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div>
      <Popup
        trigger={
          <button className="bg-slate-300 py-1 px-2 rounded-md">View</button>
        }
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
          <div className="relative max-w-5xl mx-auto px-4 py-10 bg-gray-50">
            {/* Fixed Close Button */}
            <div className="flex justify-between">
              <h1 className="text-center w-[90%] text-3xl font-bold mb-12 text-gray-900">
                Question Review
              </h1>
              <button
                onClick={close}
                className="bg-red-500 text-white h-8  px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
             
            {questions.length > 0 && selectedAnswers!=null &&
              questions.map((qui, qIndex) => {
                const userSelected = selectedAnswers[qIndex];

                return (
                  <div
                    key={qIndex}
                    className="p-4 border border-zinc-400 rounded-md my-6 mt-2 bg-white"
                  >
                    <p className="font-bold text-lg mb-2">
                      Question {qIndex + 1}
                    </p>
                    <div className="bg-zinc-100 my-2 px-4 py-4 rounded-lg text-gray-800">
                      <p>{qui.question}</p>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      {qui.options.map((option, optIndex) => {
                        const isCorrect = option === qui.correctAns;
                        const isSelected = option === userSelected;

                        let optionClasses =
                          "flex items-center bg-zinc-100 py-1 rounded-lg px-3 cursor-default select-none ";

                        if (isCorrect) {
                          optionClasses +=
                            "bg-green-100 text-green-700 font-semibold ";
                        }
                        if (isSelected && isCorrect) {
                          optionClasses += "border-2 border-blue-500 ";
                        } else if (isSelected && !isCorrect) {
                          optionClasses +=
                            "bg-red-100 text-red-700 font-semibold border-2 border-red-500 ";
                        }

                        return (
                          <label key={optIndex} className={optionClasses}>
                            <input
                              type="radio"
                              name={`question-${qIndex}`}
                              value={option}
                              checked={isSelected}
                              disabled={true}
                              className="w-4 h-4 mr-4 cursor-default"
                              readOnly
                            />
                            {option}
                            {isSelected && <TickIcon />}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </Popup>
    </div>
  );
};

export default ViewCandidateQ;
