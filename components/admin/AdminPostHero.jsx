'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../../lib/api';
import Toast from './Toast';

function AdminPostHero() {
  const [formData, setFormData] = useState({
    badge: "",
    heading: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/hero/`);
      if (res.data) {
        setFormData(res.data);
      }
    } catch (_) {
      setToast({ message: "Failed to fetch hero data", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "id") return;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const { _id, ...payload } = formData; // _id remove

      await axios.put(`${API_BASE_URL}/hero/`, payload);

      setToast({
        message: "Hero section updated successfully!",
        type: "success"
      });

    } catch (_) {
      setToast({
        message: "Failed to update hero section",
        type: "error"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full min-h-[80vh]">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-black border border-gray-100">
            <h2 className="text-3xl font-semibold mb-8 text-gray-800">Update Hero Section</h2>

            {/* Badge */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">Section Badge</label>
              <input
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                placeholder="e.g. Innovation at its best"
                className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition shadow-sm"
              />
            </div>

            {/* Heading */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">Main Heading</label>
              <input
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                placeholder="Enter main heading"
                className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition shadow-sm"
              />
            </div>

            {/* Description */}
            <div className="mb-8">
              <label className="block mb-2 font-semibold text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                rows="5"
                className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition shadow-sm"
              />
            </div>

            {/* Update Button */}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="
                w-full
                text-white
                py-4
                rounded-xl
                font-bold
                text-lg
                transition-all duration-300
                bg-gradient-to-r
                from-[#2E1A6D]
                via-[#3A2371]
                to-[#4B2D73]
                hover:opacity-95
                hover:shadow-xl
                disabled:opacity-50
                cursor-pointer
              "
            >
              {submitting ? "Updating..." : "Update Hero Section"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPostHero;
