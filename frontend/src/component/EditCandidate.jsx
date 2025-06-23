import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EditCandidate = ({ Candidate_id, fetchData, onClose }) => {
  const id = Candidate_id;
  const [form, setForm] = useState({
    name: "",
    email: "",
    tag: "",
    status: ""
  });

  useEffect(() => {
    const handleData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/candidates/${id}`);
        const result = await res.json();
        if (result != null) {
          setForm({
            name: result.name,
            email: result.email,
            tag: result.tag,
            status : result.status
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id) handleData();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/candidates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result) {
        fetchData();
        onClose();
      }
    } catch (error) {
      console.log("Error updating candidate:", error);
    }
  };

  return (
    <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg w-[90%] max-w-lg p-6 relative"
            initial={{ scale: 0.9, y: -50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: -50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
              onClick={onClose}
            >
              &times;
            </button>

            <h1 className="text-2xl font-bold text-center mb-4">Edit Candidate</h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label>Name</label>
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
                <label>Email</label>
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
                <label>Tag</label>
                <select
                  name="tag"
                  className="border rounded px-3 py-2"
                  onChange={handleChange}
                  value={form.tag}
                  required
                >
                  <option value="">Select Tag</option>
                  <option value="No Tag">No Tag</option>
                  <option value="Potencial Fit">Potencial Fit</option>
                  <option value="Average Portfolio">Average Portfolio</option>
                  <option value="Strong Portfolio">Strong Portfolio</option>
                  <option value="New">New</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label>Status</label>
                <select
                  name="status"
                  className="border rounded px-3 py-2"
                  onChange={handleChange}
                  value={form.status}
                  required
                >
                 <option value="">Update Candidate status</option>
                  <option value="selected">Selected</option>
                  <option value="rejected">Rejected</option>
                  <option value="in-review">In Review</option>
                  <option value="accepted">Accepted</option>
                </select>
              </div>

              <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition w-full">
                Submit
              </button>
            </form>
          </motion.div>
        </motion.div>
    </AnimatePresence>
  );
};

export default EditCandidate;
