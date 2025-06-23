import React from "react";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
const EditCandidateBySelf = ({candidate,handleUser}) => {
  const [form, setForm] = useState({
    name  : candidate.name || "",
    username: candidate.username || "",
    email: candidate.email || "",
    phoneno: candidate.phoneno || "",
    gender: candidate.gender || "",
    dateOfBirth: candidate.dateOfBirth || "",
    degree: candidate.degree || "",
  });
  let handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  let handleSubmit = async (e,close) => {
    e.preventDefault();
    let response = await fetch(
      `${import.meta.env.VITE_API_URL}/candidate/${candidate._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    let data = await response.json();
    if (data) {
      alert("Details updated successfully");
      handleUser();
      close();

    } else {
      alert("Failed to update details");
    }
  };
  return (
    <div>
      <Popup
        trigger={
          <button className=" inline-block px-5 py-1 rounded-full font-semibold text-white select-none bg-blue-600">
            Edit
          </button>
        }
         contentStyle={{ borderRadius: "1rem", overflow: "hidden", padding: 0 }}
        modal
        nested
      >
        {(close) => (
          <div className="p-4 px-6">
            <p className="text-3xl pb-4 font-bold text-center">Edit your Details</p>
            <form className="flex flex-col gap-4" onSubmit={(e)=>handleSubmit(e,close)}>
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="border rounded px-3 py-2"
                  onChange={handleChange}
                  value={form.name}
                  required
                />
              </div>
                  <div className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  className="border rounded px-3 py-2"
                  onChange={handleChange}
                  value={form.username}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="border rounded px-3 py-2"
                  onChange={handleChange}
                  value={form.email}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phoneno">Phone Number</label>
                <input
                  type="tel"
                  name="phoneno"
                  className="border rounded px-3 py-2"
                  onChange={handleChange}
                  value={form.phoneno}
                  required
                />
              </div>
                <div className="flex flex-col">
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" className="border rounded px-3 py-2" value={form.gender} onChange={handleChange} required>
                        <option value="" disabled>Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Others</option>
                    </select>
                </div>
                 <div className="flex flex-col">
                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                    <input
                    type="date"
                    name="dateOfBirth"
                    className="border rounded px-3 py-2"
                    onChange={handleChange}
                    value={form.dateOfBirth}
                    required
                    />
                </div>
                 <div className="flex flex-col">
                    <label htmlFor="degree">Degree</label>
                    <input
                    type="text"
                    name="degree"
                    className="border rounded px-3 py-2"
                    onChange={handleChange}
                    value={form.degree}
                    required
                    />
                </div>
              <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition w-full">
                Submit
              </button>
            </form>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default EditCandidateBySelf;
