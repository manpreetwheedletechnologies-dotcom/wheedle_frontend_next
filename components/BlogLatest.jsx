'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../lib/api';

const staticBlogs = {
  row1: [
    {
      _id: "s1",
      title: "Strategy & Consulting",
      description:
        "We analyze your business goals and challenges to create a clear digital roadmap. Our strategic approach ensures scalable, secure, and result-oriented technology solutions.",
    },
    {
      _id: "s2",
      title: "UI/UX Design",
      description:
        "User-centered design solutions that enhance usability, boost engagement, and deliver seamless digital experiences across all devices.",
    },
  ],
  row2: [
    {
      _id: "s3",
      title: "Mobile App Development",
      description:
        "Custom iOS and Android applications built for performance, scalability, and smooth user experiences—tailored to meet modern business needs.",
    },
    {
      _id: "s4",
      title: "QA & Testing",
      description:
        "Comprehensive testing services to ensure your applications are secure, bug-free, and perform flawlessly across all platforms.",
    },
    {
      _id: "s5",
      title: "Digital Transformation",
      description:
        "Helping businesses modernize their processes through innovative technologies, automation, and data-driven solutions.",
    },
    {
      _id: "s6",
      title: "Technology & Innovation",
      description:
        "Insights into emerging technologies, industry trends, and smart solutions that drive digital growth and competitive advantage.",
    },
  ],
  row3: [
    {
      _id: "s7",
      title: "Mobile App Development",
      description:
        "Custom iOS and Android applications designed for performance, usability, and scalability to deliver seamless mobile experiences.",
    },
    {
      _id: "s8",
      title: "QA & Testing",
      description:
        "Comprehensive testing services to ensure your applications are secure, bug-free, and perform flawlessly across all platforms.",
    },
    {
      _id: "s9",
      title: "Digital Transformation",
      description:
        "Helping businesses modernize their processes through innovative technologies, automation, and data-driven solutions.",
    },
  ],
};

function BlogLatest() {
  const [blogs, setBlogs] = useState(null); // null = loading, [] = api failed/empty

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/blogs/`)
      .then((res) => {
        const sortedBlogs = res.data
          .filter((b) => b.category === "services")
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        setBlogs(sortedBlogs);
      })
      .catch(() => {
        setBlogs([]); // trigger fallback to static content
      });
  }, []);

  // Derive rows — use API data if available and non-empty, else use static
  const useStatic = !blogs || blogs.length === 0;

  const row1 = useStatic ? staticBlogs.row1 : blogs.slice(0, 2);
  const row2 = useStatic ? staticBlogs.row2 : blogs.slice(2, 6);
  const row3 = useStatic ? staticBlogs.row3 : blogs.slice(6, 9);

  const cardBase = `
    p-6 rounded-2xl bg-[#040010] border border-[#7B92FF]
    transition-all duration-300 ease-out
    hover:bg-gradient-to-br hover:from-[#2934E4] hover:to-[#171D7E]
    hover:-translate-y-3 hover:scale-[1.02]
    hover:shadow-[0_15px_40px_rgba(123,146,255,0.45)]
  `;

  return (
    <section className="w-full py-20">
      <div className="w-full px-5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-Gotham text-white mb-4">
              Our Latest{" "}
              <span className="font-Gotham text-white/70">Blogs</span>
            </h2>
            <p className="text-sm text-white leading-relaxed max-w-2xl mx-auto">
              We help businesses grow smarter and faster through
              technology-driven solutions.
              <br />
              By blending innovation with expertise, we transform ideas into
              scalable, high-performance digital products.
            </p>
          </div>

          <div className="space-y-4">
            {/* ROW 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {row1.map((blog) => (
                <div key={blog._id} className={`lg:col-span-2 ${cardBase}`}>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-white leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              ))}
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {row2.map((blog) => (
                <div key={blog._id} className={cardBase}>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-white leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              ))}
            </div>

            {/* ROW 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {row3.map((blog) => (
                <div key={blog._id} className={cardBase}>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-white leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogLatest;