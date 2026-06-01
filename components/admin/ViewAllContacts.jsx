'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import API_BASE_URL from '../../lib/api';
import Toast from './Toast';

const ViewAllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Contacted: "bg-blue-100 text-blue-700",
    Selected: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ✅ FIXED API HANDLING
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/contact/`);


      // 🔥 Handles both formats:
      // 1. { contacts: [...] }
      // 2. [ ... ]
      const data = res.data?.contacts || res.data || [];

      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to fetch applications", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => setToast({ message: msg, type: "success" });
  const showError = (msg) => setToast({ message: msg, type: "error" });

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/contact/status/${id}/`, {
        status: newStatus,
      });
      showSuccess(`Status updated to ${newStatus}`);
      fetchContacts();
    } catch (_) {
      showError("Failed to update status");
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this application?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/contact/${id}`);
      showSuccess("Deleted successfully");
      fetchContacts();
    } catch (_) {
      showError("Failed to delete");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} selected?`)) return;

    try {
      setLoading(true);
      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(`${API_BASE_URL}/contact/${id}`)
        )
      );
      showSuccess("Bulk delete successful");
      setSelectedIds([]);
      fetchContacts();
    } catch (_) {
      showError("Bulk delete failed");
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

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // 🔍 SEARCH
  const filteredContacts = contacts.filter((c) =>
    (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (c.email || "").toLowerCase().includes(search.toLowerCase())
  );

  // 📄 PAGINATION
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContacts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-300">
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
          <h2 className="text-3xl font-semibold text-gray-800">
            Applications Management
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Total: {filteredContacts.length} applications
          </p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="border px-4 py-2 rounded-lg"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete ({selectedIds.length})
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center h-40 items-center">
          <div className="animate-spin h-10 w-10 border-b-2 border-purple-600 rounded-full"></div>
        </div>
      ) : (
        <>
          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border text-black">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.length === currentItems.length &&
                        currentItems.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Phone</th>
                  <th className="p-3 border">Looking For</th>
                  <th className="p-3 border">Created</th>
                  <th className="p-3 border">Updated</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="p-3 border text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item._id)}
                        onChange={() => toggleSelect(item._id)}
                      />
                    </td>

                    <td className="p-3 border">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-400">
                        ID: {item._id?.slice(-6)}
                      </div>
                    </td>

                    <td className="p-3 border">{item.email}</td>
                    <td className="p-3 border">{item.phone}</td>
                    <td className="p-3 border">{item.lookingFor}</td>
                    <td className="p-3 border">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="p-3 border">
                      {formatDate(item.updatedAt)}
                    </td>

                    <td className="p-3 border">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateStatus(item._id, e.target.value)
                        }
                        className={`px-2 py-1 rounded ${
                          statusColors[item.status] || "bg-gray-100"
                        }`}
                      >
                        <option>Pending</option>
                        <option>Contacted</option>
                        <option>Selected</option>
                        <option>Rejected</option>
                      </select>
                    </td>

                    <td className="p-3 border text-center">
                      <Trash2
                        size={18}
                        className="text-red-500 cursor-pointer"
                        onClick={() => deleteContact(item._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredContacts.length === 0 && (
              <div className="text-center py-10 text-gray-500 border">
                No applications found
              </div>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-5 gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="p-2 border rounded"
              >
                <ChevronLeft size={16} />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1 ? "bg-purple-600 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2 border rounded"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewAllContacts;