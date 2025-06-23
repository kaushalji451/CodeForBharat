import React from "react";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
const Instruction = () => {
  return (
    <div>
      <Popup
        trigger={
          <button className="hover:text-black px-4">Instructions</button>
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
          <main className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen font-sans text-gray-700">
            
            <h1 className="text-center text-4xl font-extrabold text-blue-800 mb-12">
              🚀 Dashboard Usage Instructions
            </h1>

            <section className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="flex items-center text-2xl font-bold text-blue-700 mb-4">
                <span className="mr-3 text-3xl select-none">🧭</span>
                1. Sidebar Navigation
              </h2>
              <p className="mb-2">
                On the left side of the platform, you will find the{" "}
                <strong>sidebar navigation</strong>. Here you can quickly move
                between the main sections of the application.
              </p>
              <p>
                <strong>Dashboard:</strong> Clicking this option brings you to
                the main home page where you can view all candidate details and
                monitor recruitment progress.
              </p>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="flex items-center text-2xl font-bold text-blue-700 mb-4">
                <span className="mr-3 text-3xl select-none">📘</span>
                2. Instructions Page
              </h2>
              <p className="mb-2">
                Visit this page to find clear usage instructions covering
                important workflow elements such as:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>
                  <strong>Understanding tags:</strong> Learn how to use tags to
                  categorize candidates.
                </li>
                <li>
                  <strong>Managing statuses:</strong> How to handle candidate
                  statuses like <code>To-Review</code>, <code>Recommended</code>
                  , <code>Rejected</code>, and more.
                </li>
                <li>
                  <strong>Following the workflow:</strong> Step-by-step guidance
                  for following the recruitment platform's workflow efficiently.
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="flex items-center text-2xl font-bold text-blue-700 mb-4">
                <span className="mr-3 text-3xl select-none">🧑‍💼</span>
                3. Recruitment Section
              </h2>
              <p className="mb-2">
                The recruitment section contains two key features:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>
                  <strong>Interview Scheduler:</strong> Use this tool to
                  schedule interviews with candidates directly through the
                  platform.
                </li>
                <li>
                  <strong>Candidate Repository:</strong> View all submitted
                  resumes regardless of candidate status. Each entry displays
                  the candidate’s name and their recruitment status.
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="flex items-center text-2xl font-bold text-blue-700 mb-4">
                <span className="mr-3 text-3xl select-none">📄</span>
                4. Dashboard Top Bar
              </h2>
              <p className="mb-2">
                This bar contains important action buttons to manage candidate
                data:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>
                  <strong>Export PDF Button:</strong> Click this to download a
                  PDF containing full details of all candidates.
                </li>
                <li>
                  <strong>Upload CV Button:</strong> Use this to upload or
                  re-upload a candidate's CV. You can search for the candidate
                  by name to update their existing CV quickly.
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="flex items-center text-2xl font-bold text-blue-700 mb-4">
                <span className="mr-3 text-3xl select-none">🎯</span>
                5. Candidate Status Filters
              </h2>
              <p className="mb-2">
                Use the status filter buttons to narrow down candidates based on
                their recruitment stage:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>
                  <code className="bg-blue-100 rounded px-1 text-blue-800">
                    To-Review
                  </code>{" "}
                  – Candidates pending review.
                </li>
                <li>
                  <code className="bg-blue-100 rounded px-1 text-blue-800">
                    Accepted
                  </code>
                  ,{" "}
                  <code className="bg-blue-100 rounded px-1 text-blue-800">
                    Selected
                  </code>
                  ,{" "}
                  <code className="bg-blue-100 rounded px-1 text-blue-800">
                    Rejected
                  </code>{" "}
                  – Filter candidates by their recruitment outcome.
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="flex items-center text-2xl font-bold text-blue-700 mb-4">
                <span className="mr-3 text-3xl select-none">🧩</span>
                6. Bulk Status Update
              </h2>
              <p>
                Select multiple candidates using checkboxes displayed next to
                each candidate’s entry. After selecting, click the{" "}
                <code className="bg-blue-100 rounded px-1 text-blue-800">
                  Bulk Update
                </code>{" "}
                button to change the status for all selected candidates at once
                (e.g., change their status to Selected, Accepted, or Rejected).
              </p>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="flex items-center text-2xl font-bold text-blue-700 mb-4">
                <span className="mr-3 text-3xl select-none">🔍</span>
                7. Advanced Filters
              </h2>
              <p className="mb-2">
                Refine your candidate search with advanced filters including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>
                  <strong>Position applied for:</strong> Select from the list of
                  job positions.
                </li>
                <li>
                  <strong>Application date:</strong> Filter candidates by when
                  they applied.
                </li>
                <li>
                  <strong>Quiz score:</strong> Narrow candidates based on their
                  assessment results.
                </li>
              </ul>
              <p>
                Use the{" "}
                <code className="bg-blue-100 rounded px-1 text-blue-800">
                  Apply Filter
                </code>{" "}
                button to view filtered results, or the{" "}
                <code className="bg-blue-100 rounded px-1 text-blue-800">
                  Reset
                </code>{" "}
                button to clear all filters.
              </p>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="flex items-center text-2xl font-bold text-blue-700 mb-4">
                <span className="mr-3 text-3xl select-none">👤</span>
                8. Candidate Data Display
              </h2>
              <p className="mb-2">
                The dashboard shows a paginated list (10 candidates per page)
                with the following data columns:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Name</li>
                <li>Email</li>
                <li>Status</li>
                <li>Score</li>
                <li>Applied Date</li>
                <li>Tags</li>
                <li>Action buttons for:</li>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>
                    <strong>View CV:</strong> Opens a popup modal displaying the
                    candidate’s CV.
                  </li>
                  <li>
                    <strong>Popup View:</strong> Clicking any row opens a
                    detailed popup with full candidate information, including:
                  </li>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1">
                    <li>
                      Question Review section showing options, correct answers,
                      and user-selected answers.
                    </li>
                    <li>Edit button to update candidate information.</li>
                    <li>
                      Delete button to remove the candidate from the system.
                    </li>
                  </ul>
                </ul>
              </ul>
            </section>
          </main>
        )}
      </Popup>
    </div>
  );
};

export default Instruction;
