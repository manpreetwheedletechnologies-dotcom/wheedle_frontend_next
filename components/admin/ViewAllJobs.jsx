'use client';
import React, { useEffect, useState } from "react";
import API_BASE_URL from '../../lib/api';
import Toast from './Toast';
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const ViewAllJobs = ({ onPostNew }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [toast, setToast] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/jobs/`);
      const data = await res.json();
      setJobs(data);
    } catch (_) {
      setToast({ message: "Failed to fetch jobs", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const showSuccess = (msg) => setToast({ message: msg, type: "success" });
  const showError = (msg) => setToast({ message: msg, type: "error" });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await fetch(`${API_BASE_URL}/jobs/${id}`, { method: "DELETE" });
      showSuccess("Job deleted successfully");
      fetchJobs();
    } catch (_) {
      showError("Failed to delete job");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected jobs?`)) return;

    try {
      setLoading(true);
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`${API_BASE_URL}/jobs/${id}`, { method: "DELETE" })
        )
      );
      showSuccess(`${selectedIds.length} jobs deleted successfully`);
      setSelectedIds([]);
      fetchJobs();
    } catch (_) {
      showError("Failed to delete some jobs");
      fetchJobs();
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === currentItems.length && currentItems.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentItems.map((item) => item._id));
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white border border-gray-300 p-8 rounded-xl shadow-sm w-full relative">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">Current Openings</h2>
          <p className="text-gray-500 text-sm mt-1">Total: {jobs.length} jobs</p>
        </div>

        <div className="flex gap-4">
          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-6 py-2.5 rounded-lg text-white font-semibold bg-red-500 hover:bg-red-600 transition flex items-center gap-2"
            >
              <Trash2 size={18} />
              Delete Selected ({selectedIds.length})
            </button>
          )}
          <button
            onClick={onPostNew}
            className="px-6 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-[#2E1A6D] to-[#4B2D73] cursor-pointer hover:opacity-90 transition"
          >
            Post New Job
          </button>
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 text-left text-gray-800 text-lg">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    className="w-5 h-5 cursor-pointer"
                    checked={selectedIds.length === currentItems.length && currentItems.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-4">Image</th>
                <th className="p-4">Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Description</th>
                <th className="p-4">Date</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((job) => (
                <tr
                  key={job._id}
                  className={`border-b text-gray-800 text-base hover:bg-gray-50 transition ${selectedIds.includes(job._id) ? "bg-blue-50" : ""
                    }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="w-5 h-5 cursor-pointer"
                      checked={selectedIds.includes(job._id)}
                      onChange={() => toggleSelect(job._id)}
                    />
                  </td>
                  <td className="p-4">
                    {job.image ? (
                      <img
                        src={`${API_BASE_URL}/uploads/${job.image}`}
                        className="w-16 h-16 object-cover rounded shadow-sm"
                        alt={job.title}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-medium">{job.title}</td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {job.jobType}
                    </span>
                  </td>
                  <td className="p-4 max-w-xs truncate">{job.description}</td>
                  <td className="p-4 text-gray-500">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-red-500 hover:text-red-700 transition transform hover:scale-110"
                    >
                      <Trash2 size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {jobs.length === 0 && (
            <div className="text-center py-10 text-gray-500">No jobs found.</div>
          )}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-100 transition"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`w-10 h-10 rounded-lg border transition ${currentPage === i + 1
                  ? "bg-[#2E1A6D] text-white border-[#2E1A6D]"
                  : "border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-100 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewAllJobs;
