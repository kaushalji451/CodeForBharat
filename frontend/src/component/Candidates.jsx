import { useState, useEffect } from "react";
import BulkUpdate from "./BulkUpdate";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import CandidateDetailsModal from "./CandidateDetailsModal";
const Candidates = ({ status, totalCandidate, onUploadSuccess }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    position: "",
    appliedOn: "",
    score: "",
  });

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useLocation();
  let filteredData = null;

  const openModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const applyFilters = () => {
    setPage(1);
    fetchData({ ...filtersToQuery(filters), page: 1 });
  };

  const resetFilters = () => {
    setFilters({ position: "", from: "", to: "" });
    setPage(1);
    fetchData({ page: 1, limit: 10 });
  };

  const filtersToQuery = (filters) => {
    const { appliedOn, position, score } = filters;

    return {
      position: position || undefined,
      appliedOn: appliedOn || undefined,
      score: score || undefined,
    };
  };

  const fetchData = async ({
    page = 1,
    limit = 10,
    position,
    appliedOn,
    score,
  } = {}) => {
    try {
      const params = new URLSearchParams({ page, limit });
      setLoading(true);
      if (position) params.append("position", position);
      if (appliedOn) params.append("appliedOn", appliedOn);
      params.append("score", score);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/candidates?${params}`
      );
      const result = await res.json();
      if (result) {
        setData(result.data);
        setTotal(result.total);
        setPage(result.page);
        setPages(result.pages);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let getData = async (page = 1, limit = 10) => {
      const params = new URLSearchParams({ page, limit });
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/candidates/status/${status}?${params}`
      );
      const result = await res.json();
      if (result) {
        setData(result.data);
        setTotal(result.total);
        setPage(result.page);
        setPages(result.pages);
      }
    };
    if (status) {
      getData(status);
    } else {
      fetchData({ page });
    }
  }, [onUploadSuccess, status, page]);

  const displayData = filteredData !== null ? filteredData : data;

  const [ids, setIds] = useState([]);
  const handleCheckBox = (id, checked) => {
    if (checked) {
      setIds((prev) => [...prev, id]);
    } else {
      setIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchData({ page: newPage, ...filtersToQuery(filters) });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-2"
    >
      <CandidateDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        candidateId={selectedId}
        fetchData={fetchData}
      />
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-4 py-4 items-center">
        <p className="text-zinc-600 text-sm md:text-base">
          Showing {displayData?.length || 0} out of {total}
        </p>
        {pathname === "/dashboard" && (
          <>
            <BulkUpdate ids={ids} setIds={setIds} refreshCallback={fetchData} />

            <div className="flex flex-wrap gap-3 items-center bg-white p-3 rounded-md border border-slate-300">
              <select
                value={filters.position}
                onChange={(e) =>
                  setFilters({ ...filters, position: e.target.value })
                }
                className="border border-slate-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="">All Positions</option>
                <option value="technical_role">Technical</option>
                <option value="business_role">Business</option>
              </select>

              <input
                type="date"
                value={filters.appliedOn}
                onChange={(e) =>
                  setFilters({ ...filters, appliedOn: e.target.value })
                }
                className="border border-slate-300 rounded-md px-3 py-1 text-sm"
                placeholder="Applied On"
              />
              <select
                value={filters.score}
                onChange={(e) => {
                  setFilters({ ...filters, score: e.target.value });
                  console.log(e.target.value);
                }}
                className="border border-slate-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="">Score</option>
                <option value="0-20">0-20%</option>
                <option value="20-40">20-40%</option>
                <option value="40-60">40-60%</option>
                <option value="60-80">60-80%</option>
                <option value="80-100">80-100%</option>
              </select>

              <button
                disabled={loading}
                onClick={applyFilters}
                className="border px-3 py-1 rounded-md text-sm bg-blue-50"
              >
                {!loading ? "Apply Filters" : "Filtering"}
              </button>

              <button
                onClick={resetFilters}
                className="border px-3 py-1 rounded-md text-sm bg-red-100 text-red-700"
              >
                Reset
              </button>
            </div>
          </>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border border-slate-300 bg-slate-100 w-full h-[80vh] pb-10">
        <table className="text-sm text-zinc-700 w-full">
          <thead className="bg-slate-200 text-zinc-600 font-medium">
            <tr>
              <th className="p-3">-</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Score</th>
              <th className="p-3">Applied on</th>
              <th className="p-3">Tags</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {displayData &&
              displayData.map((candidate) => (
                <motion.tr
                  key={candidate._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full border-b border-gray-200 hover:bg-slate-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(candidate._id);
                  }}
                >
                  <td className="p-3 align-middle">
                    <input
                      type="checkbox"
                      className="size-4"
                      checked={ids.includes(candidate._id)}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        handleCheckBox(candidate._id, e.target.checked)
                      }
                    />
                  </td>
                  <td className="p-3 align-middle font-semibold text-black">
                    {candidate.username?.toUpperCase()}
                  </td>
                  <td className="p-3 align-middle font-semibold text-black">
                    {candidate.email}
                  </td>
                  <td className="p-3 align-middle">
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-md text-sm">
                      {candidate.status}
                    </span>
                  </td>
                  <td className="p-3 align-middle">
                    {candidate.scoreDetails ? candidate.scoreDetails?.percentage || "0" : candidate.score?.percentage || "0" }
                  </td>
                  <td className="p-3 align-middle">
                    {candidate.appliedOn?.split("T")[0]}
                  </td>
                  <td className="p-3 align-middle text-sm">{candidate.tag}</td>
                  <td className="p-3 align-middle">
                    <div className="flex justify-center items-center">
                      <Link
                        to={candidate.cvUrl}
                        onClick={(e) => e.stopPropagation()}
                        className="border px-2 py-1 text-sm rounded-sm border-slate-400"
                      >
                        View CV
                      </Link>
                    </div>
                  </td>
                </motion.tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
          className="px-3 py-1 rounded-md bg-gray-100 border border-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded-md border ${
              page === i + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page >= pages}
          onClick={() => handlePageChange(page + 1)}
          className="px-3 py-1 rounded-md bg-gray-100 border border-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default Candidates;
