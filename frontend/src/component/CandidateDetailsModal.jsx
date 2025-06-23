import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import EditCandidate from "./EditCandidate";
import { Edit, Delete } from "lucide-react";
import ViewCandidateQ from "./ViewCandidateQ";
import Sop from "./Sop";
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, scale: 0.75 },
};

const handleDelete = async (id,fetchData,onClose) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/candidates/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const result = await res.json();
  if (result) {
    alert("Deleted Successfully");
    fetchData();
    onClose();
  } else {
    alert("Error in Deletion");
  }
};

const CandidateDetailsModal = ({ isOpen, onClose, candidateId, fetchData }) => {
  const [loading, setLoading] = useState(true);
  const [candidate, setCandidate] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (candidateId && isOpen) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/candidates/${candidateId}`)
        .then((res) => {
          setCandidate(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [candidateId, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-white/30 backdrop-blur-md flex justify-center items-center"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          {edit && (
            <EditCandidate
              Candidate_id={candidateId}
              fetchData={fetchData}
              onClose={() => setEdit(false)}
            />
          )}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative border border-gray-200"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
              </div>
            ) : candidate ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{candidate.name}</h2>
                    {console.log(candidate.SOP)}
                    <p className="text-sm text-gray-500">{candidate.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-medium">Status:</p>
                    <p className="text-gray-700">{candidate.status}</p>
                  </div>
                  <div>
                    <p className="font-medium">Tag:</p>
                    <p className="text-gray-700">{candidate.tag}</p>
                  </div>
                  <div>
                    <p className="font-medium">Applied On:</p>
                    <p className="text-gray-700">
                      {new Date(candidate.appliedOn).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {candidate.score && (
                  <div className="mt-4 border-t pt-4 text-sm">
                    <h3 className="font-semibold mb-2 text-gray-800">
                      Score Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="font-medium">Correct Answers:</p>
                        <p>{candidate.score.correctAnswer}</p>
                      </div>
                      <div>
                        <p className="font-medium">Total Questions:</p>
                        <p>{candidate.score.totalQuestion}</p>
                      </div>
                      <div>
                        <p className="font-medium">Time Left:</p>
                        <p>{candidate.score.timeLeft}</p>
                      </div>
                      <div>
                        <p className="font-medium">Percentage:</p>
                        <p>{candidate.score.percentage}%</p>
                      </div>
                      <div>
                        <p className="font-medium pb-2">Sop</p>
                        <Sop sop={candidate.SOP}/>
                      </div>

                      {candidate.score.selectedAnswers!=null && <div>
                        <p className="font-medium pb-2">
                          Questinon Review
                        </p>
                          <ViewCandidateQ selectedAnswers={candidate.score.selectedAnswers} userId={candidate._id}/>
                      </div>}
                    </div>
                    <div className="flex items-center gap-5 py-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEdit(!edit);
                        }}
                        className="flex gap-2"
                      >
                        <Edit size={25} color="Blue" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(candidateId,fetchData,onClose)}
                        className="flex gap-2"
                      >
                        <Delete size={25} color="Red" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-10">
                No candidate found.
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CandidateDetailsModal;
