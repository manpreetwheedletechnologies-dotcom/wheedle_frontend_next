'use client';
/**
 * ViewAllFormLeads.jsx
 * Displays all form leads with proper null/undefined handling
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../../lib/api';
import { Search, Mail, Phone, Building2, Calendar, Filter, Download, Trash2 } from "lucide-react";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
});

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const formatDate = (iso) => {
  if (!iso) return "N/A";
  try {
    return new Date(iso).toLocaleDateString([], { 
      day: "2-digit", 
      month: "short", 
      year: "numeric" 
    });
  } catch {
    return "N/A";
  }
};

const formatTime = (iso) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
};

const getInitials = (name) => {
  if (!name || typeof name !== "string") return "?";
  const parts = name.trim().split(" ").filter(p => p.length > 0);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return (parts[0][0] || "?").toUpperCase();
  return ((parts[0][0] || "") + (parts[parts.length - 1][0] || "")).toUpperCase();
};

const getDisplayName = (name) => {
  if (!name || typeof name !== "string") return "Unknown";
  return name.trim() || "Unknown";
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const ViewAllFormLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const leadsPerPage = 10;

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/formleads/`, {
        headers: authHeader(),
      });
      setLeads(res.data || []);
    } catch (error) {
      console.error("Error fetching form leads:", error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/formleads/delete/${id}`, {
        headers: authHeader(),
      });
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
      setSelectedLeads((prev) => prev.filter((lid) => lid !== id));
    } catch (error) {
      console.error("Error deleting lead:", error);
      alert("Failed to delete lead. Please try again.");
    }
  };

  const bulkDelete = async () => {
    if (selectedLeads.length === 0) return;
    if (!window.confirm(`Delete ${selectedLeads.length} selected leads?`)) return;
    try {
      await Promise.all(
        selectedLeads.map((id) =>
          axios.delete(`${API_BASE_URL}/formleads/delete/${id}`, {
            headers: authHeader(),
          })
        )
      );
      setLeads((prev) => prev.filter((lead) => !selectedLeads.includes(lead._id)));
      setSelectedLeads([]);
    } catch (error) {
      console.error("Error bulk deleting:", error);
      alert("Failed to delete some leads. Please try again.");
    }
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Mobile", "Company", "Service", "Requirement", "Date"];
    const rows = filteredLeads.map((lead) => [
      getDisplayName(lead.name),
      lead.email || "",
      lead.mobile || "",
      lead.company || "",
      lead.service || "",
      lead.requirement || "",
      formatDate(lead.created_at),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `form-leads-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const toggleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map((lead) => lead._id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((lid) => lid !== id) : [...prev, id]
    );
  };

  const filteredLeads = leads.filter((lead) => {
    if (filterStatus !== "all") {
      if (filterStatus === "new" && lead.status === "read") return false;
      if (filterStatus === "read" && lead.status !== "read") return false;
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      const nameMatch = getDisplayName(lead.name).toLowerCase().includes(searchLower);
      const emailMatch = (lead.email || "").toLowerCase().includes(searchLower);
      const mobileMatch = (lead.mobile || "").includes(search);
      const companyMatch = (lead.company || "").toLowerCase().includes(searchLower);
      if (!nameMatch && !emailMatch && !mobileMatch && !companyMatch) return false;
    }
    
    return true;
  });

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  );

  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/formleads/update/${id}`,
        { status: "read" },
        { headers: authHeader() }
      );
      setLeads((prev) =>
        prev.map((lead) => (lead._id === id ? { ...lead, status: "read" } : lead))
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const markAllAsRead = async () => {
    const unreadIds = filteredLeads
      .filter((lead) => lead.status !== "read")
      .map((lead) => lead._id);
    
    if (unreadIds.length === 0) return;

    try {
      await axios.patch(
        `${API_BASE_URL}/formleads/mark-all-read`,
        {},
        { headers: authHeader() }
      );
      setLeads((prev) =>
        prev.map((lead) => (unreadIds.includes(lead._id) ? { ...lead, status: "read" } : lead))
      );
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Form Leads</h2>
            <p className="text-gray-500 text-sm mt-1">
              {filteredLeads.length} leads {filterStatus !== "all" && `(${filterStatus})`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
            >
              Mark All Read
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition flex items-center gap-2"
            >
              <Download size={16} /> Export CSV
            </button>
            {selectedLeads.length > 0 && (
              <button
                onClick={bulkDelete}
                className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center gap-2"
              >
                <Trash2 size={16} /> Delete ({selectedLeads.length})
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, mobile, company..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
          </div>
        ) : paginatedLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Mail size={24} />
            </div>
            <p className="text-lg font-medium">No leads found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === paginatedLeads.length && paginatedLeads.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Requirement</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedLeads.map((lead) => (
                <tr
                  key={lead._id}
                  className={`hover:bg-gray-50 transition ${lead.status !== "read" ? "bg-blue-50/30" : ""}`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead._id)}
                      onChange={() => toggleSelect(lead._id)}
                      className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-semibold">
                        {getInitials(lead.name)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {getDisplayName(lead.name)}
                          {lead.status !== "read" && (
                            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block" />
                          )}
                        </p>
                        {lead.email && (
                          <p className="text-xs text-gray-500">{lead.email}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {lead.email && (
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Mail size={14} className="text-gray-400" />
                          {lead.email}
                        </p>
                      )}
                      {lead.mobile && (
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Phone size={14} className="text-gray-400" />
                          {lead.mobile}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Building2 size={14} className="text-gray-400" />
                      {lead.company || "-"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      {lead.service || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 max-w-[200px] truncate">
                      {lead.requirement || "-"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-gray-800">{formatDate(lead.created_at)}</p>
                      <p className="text-xs text-gray-400">{formatTime(lead.created_at)}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {lead.status !== "read" && (
                        <button
                          onClick={() => markAsRead(lead._id)}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition"
                          title="Mark as read"
                        >
                          <Calendar size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteLead(lead._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * leadsPerPage + 1} to{" "}
            {Math.min(currentPage * leadsPerPage, filteredLeads.length)} of{" "}
            {filteredLeads.length} leads
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 text-sm rounded-lg ${
                    currentPage === pageNum
                      ? "bg-purple-600 text-white"
                      : "border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllFormLeads;
