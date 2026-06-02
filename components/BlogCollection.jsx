'use client';
import { useRouter } from 'next/navigation';
import Button from "./Button_x";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from '../lib/api';
import staticBlogs from '../lib/blogs';

function BlogCollection() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/blogs/`).catch(() => ({ data: null }));

      let comprehensiveBlogs = (res.data || []).filter(
        (blog) => blog.category === "comprehensive"
      );

      if (comprehensiveBlogs.length === 0) {
        comprehensiveBlogs = staticBlogs;
      }

      setBlogs(comprehensiveBlogs);
    } catch (error) {
      console.log(error);
      // Fallback to static on error
      const fallbackBlogs = staticBlogs;
      setBlogs(fallbackBlogs);
    }
  };

  return (
    <section className="w-full py-20">
      <div className="w-full px-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left Content (UNCHANGED) */}
            <div className="lg:w-2/5 lg:sticky lg:top-32 lg:self-start">
              <h2 className="text-4xl lg:text-5xl font-Gotham text-white leading-tight mb-6">
                Explore Our
                <br />
                Comprehensive
                <br />
                <span className="font-Gautam text-white/70">
                  Blog Collection
                </span>
              </h2>

              <p className="text-sm text-white leading-relaxed">
                Discover insightful articles covering the latest trends,
                strategies, and innovations in technology.
              </p>
            </div>

            {/* Right Content - Dynamic Blog Cards */}
            <div className="lg:w-3/5 flex flex-col gap-6 max-h-[470px] overflow-y-scroll pr-2 scrollbar-hide">
              {blogs.map((blog, index) => (
                <div
                  key={blog.slug}
                  className="w-full max-w-[595px] h-auto sm:h-[221px] rounded-[25px] bg-gradient-to-r from-[#0B2CC3] to-[#7B92FF] p-[1px]"
                >
                  <div className="w-full h-auto sm:h-full flex flex-col sm:flex-row gap-[10px] pt-[15px] pr-[25px] pb-[15px] pl-[15px] rounded-[24px] bg-[#040010] transition-all">
                    {/* Image */}
                    <div className="w-full sm:w-[191px] h-[191px] flex-shrink-0 rounded-[15px] overflow-hidden">
                      <img
                      src={blog.blogImage?.startsWith('/') || blog.blogImage?.startsWith('http') ? blog.blogImage : `${API_BASE_URL}/uploads/${blog.blogImage}/`}
                        alt={blog.title}
                        className={`w-full h-full object-cover object-top transition-transform duration-300 hover:scale-110
                          ${index === 0 ? "object-right" : "object-top"}
                        `}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {blog.title}
                      </h3>

                      <p className="text-xs text-white leading-relaxed mb-3">
                        {blog.description}
                      </p>

                      <div>
                        <Button
                          onClick={() => router.push(`/blog/${blog.slug}`)}
                          className="px-4 py-2 text-xs font-Inter text-[#000000] bg-[#FFFFFF] border border-white/20 rounded-full transition-colors"
                        >
                          View Blog
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogCollection;
