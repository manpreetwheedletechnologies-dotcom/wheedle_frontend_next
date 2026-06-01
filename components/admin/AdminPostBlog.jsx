'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../../lib/api';
import Toast from './Toast';

function AdminPostBlog({ category, onBack }) {
  const [preview, setPreview] = useState("");
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    blogCategory: "",
    blogImage: null,
    sectionTitles: {
      whatIs: "",
      benefits: "",
      future: "",
      howItWorks: "",
      final: "",
    },
    content: {
      intro: "",
      whatIs: "",
      benefits: {
        description: "",
        items: [
          { title: "", desc: "" },
          { title: "", desc: "" },
        ],
      },
      future: "",
      howItWorks: [
        { title: "", desc: "" },
        { title: "", desc: "" },
      ],
      final: "",
    },
  });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("sectionTitles.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        sectionTitles: { ...prev.sectionTitles, [key]: value },
      }));
    } else if (
      name.startsWith("content.") &&
      !name.includes("benefits") &&
      !name.includes("howItWorks")
    ) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        content: { ...prev.content, [key]: value },
      }));
    } else if (name === "benefits.description") {
      setFormData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          benefits: { ...prev.content.benefits, description: value },
        },
      }));
    } else if (name.startsWith("benefits.item")) {
      const parts = name.split(".");
      const index = Number(parts[2]);
      const field = parts[3];
      const updated = formData.content.benefits.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      setFormData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          benefits: { ...prev.content.benefits, items: updated },
        },
      }));
    } else if (name.startsWith("howItWorks.item")) {
      const parts = name.split(".");
      const index = Number(parts[2]);
      const field = parts[3];
      const updated = formData.content.howItWorks.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      setFormData((prev) => ({
        ...prev,
        content: { ...prev.content, howItWorks: updated },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, blogImage: file }));
    setPreview(URL.createObjectURL(file));
  };

  const addBenefit = () => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        benefits: {
          ...prev.content.benefits,
          items: [...prev.content.benefits.items, { title: "", desc: "" }],
        },
      },
    }));
  };

  const removeBenefit = (index) => {
    const updated = formData.content.benefits.items.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        benefits: { ...prev.content.benefits, items: updated },
      },
    }));
  };

  const addHowItWorks = () => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        howItWorks: [...prev.content.howItWorks, { title: "", desc: "" }],
      },
    }));
  };

  const removeHowItWorks = (index) => {
    const updated = formData.content.howItWorks.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      content: { ...prev.content, howItWorks: updated },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const slug =
        formData.slug ||
        formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      if (category === "services") {
        const servicesData = new FormData();
        servicesData.append("category", category);
        servicesData.append("slug", slug);
        servicesData.append("title", formData.title);
        servicesData.append("description", formData.description);
        servicesData.append("blogCategory", "Services Blog");
        if (formData.blogImage) servicesData.append("blogImage", formData.blogImage);
        servicesData.append("sectionTitles", JSON.stringify({}));
        servicesData.append("content", JSON.stringify({}));
        await axios.post(`${API_BASE_URL}/blogs/`, servicesData);
        setToast({ message: "Services Blog Posted!", type: "success" });
        setTimeout(() => onBack(), 2000);
        return;
      }

      const data = new FormData();
      data.append("category", category);
      data.append("slug", slug);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("blogCategory", formData.blogCategory);
      if (formData.blogImage) data.append("blogImage", formData.blogImage);
      data.append("sectionTitles", JSON.stringify(formData.sectionTitles));
      data.append("content", JSON.stringify(formData.content));
      await axios.post(`${API_BASE_URL}/blogs/`, data);
      setToast({ message: "Blog Posted Successfully!", type: "success" });
      setTimeout(() => onBack(), 2000);
    } catch (err) {
      setToast({ message: "Failed to post blog", type: "error" });
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
        <div className="flex justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            {category === "services" ? "Post Services Blog" : "Post Comprehensive Blog"}
          </h2>
          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#2E1A6D] via-[#3A2371] to-[#4B2D73] cursor-pointer"
          >
            View All Blogs
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">

          {/* ── Basic Information ── */}
          <h3 className="text-xl font-semibold">Basic Information</h3>

          {category !== "services" && (
            <input
              name="slug"
              value={formData.slug}
              placeholder="Slug (example: what-is-agentic-ai) "
              onChange={handleChange}
              className="inputbox"
            />
          )}

          <input
            name="title"
            value={formData.title}
            placeholder="Blog Title"
            onChange={handleChange}
            className="inputbox"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            placeholder="Blog Description"
            onChange={handleChange}
            className="inputbox"
            required
          />

          {category !== "services" && (
            <>
              <input
                name="blogCategory"
                value={formData.blogCategory}
                placeholder="Blog Category (example: AI, Marketing, Web)"
                onChange={handleChange}
                className="inputbox"
              />
              <div>
                <label className="font-medium">Blog Image</label>
                <input type="file" onChange={handleImageChange} className="inputbox" />
                {preview && (
                  <img
                    src={preview}
                    className="h-32 mt-3 rounded shadow-sm object-cover"
                    alt="Preview"
                  />
                )}
              </div>
            </>
          )}

          {/* ── Section Titles (comprehensive only) ── */}
          {category !== "services" && (
            <>
              <h3 className="text-xl font-semibold">Section Titles</h3>
              {Object.keys(formData.sectionTitles).map((key) => (
                <input
                  key={key}
                  name={`sectionTitles.${key}`}
                  value={formData.sectionTitles[key]}
                  placeholder={`Enter "${key}" section heading`}
                  onChange={handleChange}
                  className="inputbox"
                />
              ))}

              {/* ── Content ── */}
              <h3 className="text-xl font-semibold">Content</h3>

              <textarea
                name="content.intro"
                value={formData.content.intro}
                placeholder="Intro Content"
                onChange={handleChange}
                className="inputbox"
              />

              <textarea
                name="content.whatIs"
                value={formData.content.whatIs}
                placeholder="What Is Content"
                onChange={handleChange}
                className="inputbox"
              />

              {/* Benefits */}
              <h4 className="font-semibold text-lg">Benefits</h4>

              <textarea
                name="benefits.description"
                value={formData.content.benefits.description}
                placeholder="Benefits Description"
                onChange={handleChange}
                className="inputbox"
              />

              {formData.content.benefits.items.map((item, index) => (
                <div key={index} className="border border-gray-200 p-4 rounded-xl bg-white">
                  <input
                    name={`benefits.item.${index}.title`}
                    value={item.title}
                    placeholder={`Benefit ${index + 1} Title`}
                    onChange={handleChange}
                    className="inputbox mb-2"
                  />
                  <input
                    name={`benefits.item.${index}.desc`}
                    value={item.desc}
                    placeholder={`Benefit ${index + 1} Description`}
                    onChange={handleChange}
                    className="inputbox"
                  />
                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove Benefit
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addBenefit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
              >
                + Add Benefit
              </button>

              <textarea
                name="content.future"
                value={formData.content.future}
                placeholder="Future Content"
                onChange={handleChange}
                className="inputbox"
              />

              {/* How It Works */}
              <h4 className="font-semibold text-lg">How It Works</h4>

              {formData.content.howItWorks.map((item, index) => (
                <div key={index} className="border border-gray-200 p-4 rounded-xl bg-white">
                  <input
                    name={`howItWorks.item.${index}.title`}
                    value={item.title}
                    placeholder={`Step ${index + 1} Title`}
                    onChange={handleChange}
                    className="inputbox mb-2"
                  />
                  <input
                    name={`howItWorks.item.${index}.desc`}
                    value={item.desc}
                    placeholder={`Step ${index + 1} Description`}
                    onChange={handleChange}
                    className="inputbox"
                  />
                  <button
                    type="button"
                    onClick={() => removeHowItWorks(index)}
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove Step
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addHowItWorks}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
              >
                + Add Step
              </button>

              <textarea
                name="content.final"
                value={formData.content.final}
                placeholder="Final Content"
                onChange={handleChange}
                className="inputbox"
              />
            </>
          )}

          {/* ── Submit ── */}
          <button
            type="submit"
            className="w-full py-4 text-white font-bold text-lg bg-gradient-to-r from-[#2E1A6D] via-[#3A2371] to-[#4B2D73] rounded-xl cursor-pointer hover:opacity-95 transition shadow-lg"
          >
            {category === "services" ? "Post Services Blog" : "Post Comprehensive Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminPostBlog;