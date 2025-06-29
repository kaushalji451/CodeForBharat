import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { SidebarContent } from "../pages/Dashboard";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Candidates from "./Candidates";
import UploadResume from "./UploadResume";

const statusList = ["in-review", "accepted", "selected", "rejected"];

function StatusPages({page}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [statusCounts, setStatusCounts] = useState({});
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove("token");
        navigate("/login");
    };

    const handleExport = async () => {
        const data = await fetch(`${import.meta.env.VITE_API_URL}/export`, {
            method: "GET",
            headers: {
                "Content-Type": "application/pdf",
            },
        });
        const blob = await data.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "candidates.pdf";
        a.click();
    };

    const sidebarVariants = {
        open: { x: 0, transition: { type: "tween", duration: 0.3 } },
        closed: { x: "-100%", transition: { type: "tween", duration: 0.3 } },
    };

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/candidates/status-counts`);
                const data = await res.json();
                setStatusCounts(data);
            } catch (err) {
                console.error("Error fetching status counts:", err);
            }
        };

        fetchCounts();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex relative overflow-x-hidden">
            {/* Sidebar for large screens */}
            <aside className="hidden md:flex w-64 flex-col p-6 border-r border-gray-200 bg-white fixed inset-y-0">
                <SidebarContent logout={handleLogout} />
            </aside>

            {/* Mobile Sidebar with Framer Motion */}
            <motion.aside
                className="fixed z-40 bg-white w-64 h-full p-6 shadow-lg md:hidden"
                initial="closed"
                animate={sidebarOpen ? "open" : "closed"}
                variants={sidebarVariants}
            >
                <SidebarContent />
            </motion.aside>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content area */}
            <div className={`flex-1 md:ml-64 transition-all duration-300 w-full`}>
                {/* Top Navbar */}
                <div className="sticky top-0 bg-white shadow px-4 py-3 flex justify-between items-center md:hidden z-10">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-700">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-xl font-bold">Candidates</h2>
                            <p className="text-sm text-gray-500">Manage all applicants for this position</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleExport}
                                className="px-4 py-2 border rounded bg-white hover:bg-gray-100 text-sm"
                            >
                                Export PDF
                            </button>
                            <UploadResume />
                        </div>
                    </div>

                    {/* Status Tabs */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-b pb-2 mb-4">
                        {statusList.map((status, i) => (
                            <a href={`/${status === "in-review" ? "to-review" : status}`} key={i} className="flex items-center gap-1 cursor-pointer">
                                {status === "in-review" ? "to-review".toUpperCase() : status.toUpperCase()}
                                <span className="text-[10px] border px-2 py-[1px] rounded border-gray-300">{statusCounts[status] || 0}</span>
                            </a>
                        ))}
                    </div>

                    {/* Candidates Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded shadow"
                    >
                        <div className="overflow-y-auto bg-slate-50">
                            <Candidates status={page} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default StatusPages;