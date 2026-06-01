'use client';
import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from '../../lib/api';
import Toast from './Toast';

const AddNewPartner = ({ setActivePage }) => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const showSuccess = (msg) => setToast({ message: msg, type: "success" });
  const showError = (msg) => setToast({ message: msg, type: "error" });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !logo) {
      showError("Please provide both partner name and logo");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("logo", logo);

      await axios.post(`${API_BASE_URL}/partner/`, formData);
      showSuccess("New partner added successfully!");

      setTimeout(() => {
        setActivePage("partners");
      }, 2000);
    } catch (_) {
      showError("Failed to add new partner");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-start px-4 sm:px-6 lg:px-8 py-10 relative">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="bg-white border border-gray-300 p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Partner</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-semibold">Partner Name</label>
            <input
              type="text"
              placeholder="e.g. Microsoft / Google"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-gray-300 p-4 rounded-xl text-black outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-semibold">Partner Logo</label>
            <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-purple-50 hover:border-purple-500 transition shadow-sm">
              <span className="text-gray-500 font-medium">Click to upload partner logo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
                required
              />
              {preview && <img src={preview} className="mt-4 h-24 object-contain" alt="Preview" />}
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="
              w-full
              mt-4
              px-6
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
            {submitting ? "Saving..." : "Save Partner"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewPartner;
