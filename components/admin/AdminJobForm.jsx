'use client';
import React, { useState } from "react";
import API_BASE_URL from '../../lib/api';
import Toast from './Toast';

const AdminJobForm = ({ onViewAllJobs }) => {
  const [formData, setFormData] = useState({
    image: "",
    jobType: "",
    title: "",
    description: "",
  });

  const [preview, setPreview] = useState("");
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const showSuccess = (msg) => setToast({ message: msg, type: "success" });
  const showError = (msg) => setToast({ message: msg, type: "error" });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setFormData({
        ...formData,
        image: file, // Store the file itself for FormData
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image || !formData.jobType || !formData.title || !formData.description) {
      showError("Please fill all fields and upload a job banner");
      return;
    }

    try {
      setSubmitting(true);
      const form = new FormData();
      form.append("image", formData.image);
      form.append("jobType", formData.jobType);
      form.append("title", formData.title);
      form.append("description", formData.description);

      const res = await fetch(`${API_BASE_URL}/jobs/`, {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        showSuccess("Job Posted Successfully!");
        setFormData({
          image: "",
          jobType: "",
          title: "",
          description: "",
        });
        setPreview("");
        setTimeout(() => onViewAllJobs(), 2000);
      } else {
        const data = await res.json();
        showError(data.message || "Failed to post job");
      }
    } catch (_) {
      showError("An error occurred while posting the job");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full relative">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="bg-white border border-gray-300 p-8 lg:p-10 rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Post New Job</h2>
          <button
            onClick={() => onViewAllJobs()}
            className="px-6 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-[#2E1A6D] to-[#4B2D73] hover:opacity-90 transition shadow-md cursor-pointer"
          >
            View All Jobs
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* BANNER UPLOAD */}
          <div>
            <label className="font-semibold text-gray-700 block mb-2 text-lg">Job Banner / Image</label>
            <label className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-purple-50 hover:border-purple-500 transition shadow-sm">
              <span className="text-gray-500 font-medium">Click to upload job banner</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {preview && <img src={preview} className="mt-4 h-40 rounded-xl object-cover border shadow-sm" alt="Preview" />}
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* JOB TYPE */}
            <div>
              <label className="font-semibold text-gray-700 block mb-2">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full border border-gray-300 p-4 rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-purple-500 shadow-sm outline-none transition cursor-pointer"
                required
              >
                <option value="">Select Type</option>
                <option value="Onsite">Onsite</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* JOB TITLE */}
            <div>
              <label className="font-semibold text-gray-700 block mb-2">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Software Engineer"
                className="w-full border border-gray-300 p-4 rounded-xl text-black dark:text-white focus:ring-2 focus:ring-purple-500 shadow-sm transition outline-none"
                required
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="font-semibold text-gray-700 block mb-2 text-lg">Detailed Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Outline the responsibilities, requirements, and benefits..."
              rows="6"
              className="w-full border border-gray-300 p-4 rounded-xl text-black dark:text-white focus:ring-2 focus:ring-purple-500 shadow-sm transition outline-none"
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={submitting}
            className="
              w-full
              py-4
              rounded-xl
              text-white
              font-bold
              text-lg
              bg-gradient-to-r
              from-[#2E1A6D]
              via-[#3A2371]
              to-[#4B2D73]
              hover:opacity-95
              transition-all
              shadow-lg
              cursor-pointer
              disabled:opacity-50
              transform active:scale-[0.98]
            "
          >
            {submitting ? "Posting..." : "Post Job Opportunity"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminJobForm;
