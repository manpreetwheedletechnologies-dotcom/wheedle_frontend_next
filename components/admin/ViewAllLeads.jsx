'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import API_BASE_URL from '../../lib/api';
import Toast from './Toast';

const ViewAllLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [toast, setToast] = useState(null);

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Contacted: "bg-blue-100 text-blue-700",
    Selected: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/leads/`);
      setLeads(res.data || []);
    } catch (_) {
      setToast({ message: "Error fetching newsletter leads", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => setToast({ message: msg, type: "success" });
  const showError = (msg) => setToast({ message: msg, type: "error" });

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/leads/${id}/`, { status });
      showSuccess(`Status updated to ${status}`);
      setLeads((prev) =>
        prev.map((lead) => (lead._id === id ? { ...lead, status } : lead))
      );
    } catch (_) {
      showError("Failed to update status");
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/leads/${id}`);
      showSuccess("Lead deleted successfully");
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (_) {
      showError("Failed to delete lead");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected leads?`)) return;

    try {
      setLoading(true);
      await Promise.all(
        selectedIds.map((id) => axios.delete(`${API_BASE_URL}/leads/${id}`))
      );
      showSuccess(`${selectedIds.length} leads deleted successfully`);
      setSelectedIds([]);
      fetchLeads();
    } catch (_) {
      showError("Failed to delete some leads");
      fetchLeads();
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
  const currentItems = leads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(leads.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-300 relative">
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
          <h2 className="text-3xl font-semibold text-gray-800">All Newsletter Leads</h2>
          <p className="text-gray-500 text-sm mt-1">Total: {leads.length} leads</p>
        </div>

        {selectedIds.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="px-6 py-2.5 rounded-lg text-white font-semibold bg-red-500 hover:bg-red-600 transition flex items-center gap-2"
          >
            <Trash2 size={18} />
            Delete Selected ({selectedIds.length})
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-800">
                  <th className="p-4 w-10 border text-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5 cursor-pointer"
                      checked={selectedIds.length === currentItems.length && currentItems.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-4 border font-semibold">Type</th>
                  <th className="p-4 border font-semibold">Value</th>
                  <th className="p-4 border font-semibold">Date</th>
                  <th className="p-4 border font-semibold">Status</th>
                  <th className="p-4 border font-semibold text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((lead) => (
                  <tr
                    key={lead._id}
                    className={`hover:bg-gray-50 transition ${selectedIds.includes(lead._id) ? "bg-blue-50" : ""
                      }`}
                  >
                    <td className="p-4 border text-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5 cursor-pointer"
                        checked={selectedIds.includes(lead._id)}
                        onChange={() => toggleSelect(lead._id)}
                      />
                    </td>
                    <td className="p-4 border capitalize text-gray-800 font-medium">{lead.type}</td>
                    <td className="p-4 border text-gray-600">{lead.value}</td>
                    <td className="p-4 border text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 border">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead._id, e.target.value)}
                        className={`px-3 py-2 rounded-lg font-medium cursor-pointer outline-none w-full ${statusColors[lead.status] || "bg-gray-100 text-gray-700"
                          }`}
                      >
                        <option>Pending</option>
                        <option>Contacted</option>
                        <option>Selected</option>
                        <option>Rejected</option>
                      </select>
                    </td>

                    <td className="p-4 border text-center">
                      <Trash2
                        size={22}
                        className="text-red-500 cursor-pointer hover:text-red-700 transition transform hover:scale-110 inline-block"
                        onClick={() => deleteLead(lead._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {leads.length === 0 && (
              <div className="text-center py-10 text-gray-500 border rounded-b-xl">No leads found.</div>
            )}
          </div>

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
        </>
      )}
    </div>
  );
};

export default ViewAllLeads;
