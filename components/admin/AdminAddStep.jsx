'use client';
import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from '../../lib/api';
import Toast from './Toast';

const AdminAddStep = ({ setActivePage }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const showSuccess = (msg) => setToast({ message: msg, type: "success" });
  const showError = (msg) => setToast({ message: msg, type: "error" });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      showError("Please fill all required fields and upload an image");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      await axios.post(`${API_BASE_URL}/steps/`, formData);
      showSuccess("New step added successfully!");

      setTimeout(() => {
        setActivePage("steps");
      }, 2000);
    } catch (_) {
      showError("Failed to add new step");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center w-full py-10 px-4 relative">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="bg-white p-8 shadow-lg rounded-2xl w-full max-w-xl border border-gray-100">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Step</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-gray-800">
          {/* TITLE FIELD */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Step Title</label>
            <input
              type="text"
              placeholder="e.g. Initial Consultation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition"
              required
            />
          </div>

          {/* DESCRIPTION FIELD */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Step Description</label>
            <textarea
              placeholder="Describe the process in this step..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition resize-none"
              required
            />
          </div>

          {/* IMAGE FIELD */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Step Illustration / Image</label>
            <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-purple-50 hover:border-purple-500 transition shadow-sm">
              <span className="text-gray-500 font-medium">Click to upload step image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                required
              />
              {preview && <img src={preview} className="mt-4 h-32 rounded-xl object-cover border shadow-sm" alt="Preview" />}
            </label>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={submitting}
            className="
              mt-4
              bg-gradient-to-r
              from-[#2E1A6D]
              via-[#3A2371]
              to-[#4B2D73]
              text-white
              py-4
              rounded-xl
              font-bold
              text-lg
              hover:opacity-95
              transition-all
              shadow-lg
              cursor-pointer
              disabled:opacity-50
              transform active:scale-[0.98]
            "
          >
            {submitting ? "Saving..." : "Save Step"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddStep;
