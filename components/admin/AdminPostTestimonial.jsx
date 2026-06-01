'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../../lib/api';
import Toast from './Toast';

function AdminPostTestimonial({ onViewAllTestimonials }) {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    position: "",
    description: "",
    date: "",
  });

  const [preview, setPreview] = useState("");
  const [existingTestimonials, setExistingTestimonials] = useState([]);
  const [toast, setToast] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/testimonial`);
      setExistingTestimonials(res.data);
    } catch (_) {
      console.error("Failed to fetch testimonials");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      setPreview(URL.createObjectURL(file));
    }
  };

  const showSuccess = (msg) => setToast({ message: msg, type: "success" });
  const showError = (msg) => setToast({ message: msg, type: "error" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isDuplicate = existingTestimonials.some(
      (item) =>
        item.name === formData.name &&
        item.description === formData.description &&
        item.position === formData.position,
    );

    if (isDuplicate) {
      showError("Testimonial already exists!");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("position", formData.position);
      data.append("image", formData.image);
      data.append("date", formData.date);

      await axios.post(`${API_BASE_URL}/testimonial/`, data);
      showSuccess("Testimonial Added Successfully!");

      setFormData({
        name: "",
        description: "",
        position: "",
        date: "",
        image: null,
      });
      setPreview("");
      fetchTestimonials();
      setTimeout(() => onViewAllTestimonials(), 2000);
    } catch (_) {
      showError("Failed to add testimonial");
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

      <div className="bg-[#F8FAFC] border border-gray-300 p-8 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Post New Testimonial</h2>
          <button
            onClick={onViewAllTestimonials}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#2E1A6D] via-[#3A2371] to-[#4B2D73] hover:opacity-90 transition shadow-md cursor-pointer"
          >
            View All Testimonials
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="font-semibold text-gray-700 block mb-2 text-lg">Upload Image</label>
            <label className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-white hover:border-purple-500 hover:bg-purple-50 transition">
              <span className="text-gray-500 font-medium">Click to upload client image</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-gray-700 block mb-2">Client Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 shadow-sm text-gray-900"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 block mb-2">Position / Company</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. CEO, Tech Corp"
                className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 shadow-sm text-gray-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700 block mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 shadow-sm text-gray-900"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700 block mb-2">Description / Quote</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter client's testimonial feedback..."
              rows="5"
              className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 shadow-sm text-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-[#2E1A6D] via-[#3A2371] to-[#4B2D73] hover:opacity-95 transition shadow-lg cursor-pointer transform active:scale-[0.98]"
          >
            Post Testimonial
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminPostTestimonial;
