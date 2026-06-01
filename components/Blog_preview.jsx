'use client';

import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Badge from './Badge';
import API_BASE_URL from '../lib/api';
import blogs from '../lib/blogs';
import axios from 'axios';

export default function BlogDetails({ slug }) {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (!slug) return;
    axios.get(`${API_BASE_URL}/blogs/${slug}`)
      .then((res) => setBlog(res.data))
      .catch(() => {
        const staticBlog = blogs.find((b) => b.slug === slug);
        if (staticBlog) setBlog(staticBlog);
      });
  }, [slug]);

  if (!blog) return <div className="text-white p-20">Loading...</div>;

  const normalizeContent = (content) => ({
    intro: Array.isArray(content?.intro) ? content.intro : content?.intro ? [content.intro] : [],
    whatIs: Array.isArray(content?.whatIs) ? content.whatIs : content?.whatIs ? [content.whatIs] : [],
    benefits: content?.benefits || { description: '', items: [] },
    future: content?.future || '',
    howItWorks: Array.isArray(content?.howItWorks) ? content.howItWorks : content?.howItWorks ? [content.howItWorks] : [],
    final: Array.isArray(content?.final) ? content.final : content?.final ? [content.final] : [],
  });

  if (!blog.content) return <div className="text-white p-20">No content available for this blog.</div>;

  const normalizedContent = normalizeContent(blog.content);
  const titles = blog.sectionTitles || { whatIs: 'What is this?', benefits: 'Key Benefits', future: 'Future Outlook', howItWorks: 'How It Works', final: 'Conclusion' };

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Header />
      <section className="w-full flex justify-center bg-[#010509] mt-16 lg:mt-22">
        <div className="relative w-full max-w-[1440px] min-h-[60vh] sm:min-h-[65vh] lg:min-h-[70vh] mt-[-5%]">
          <img src="/frame-image.png" alt="Frame" className="absolute inset-0 w-full h-full object-cover lg:object-contain" />
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-5 text-center gap-6">
            <Badge text={blog.category || blog.blogCategory} margin="" />
            <h1 className="font-gotham font-medium text-[28px] sm:text-[32px] lg:text-[40px] max-w-[900px]">{blog.title}</h1>
            <p className="text-gray-300 max-w-[700px]">{blog.description}</p>
          </div>
        </div>
      </section>
      <section className="w-full -mt-24 sm:-mt-30 lg:-mt-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/BG.png')" }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-20 space-y-14 text-gray-300 leading-8">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col lg:flex-row items-center gap-10">
            <div className="w-full lg:w-1/2">
              <img
                src={blog.blogImage?.startsWith('/') || blog.blogImage?.startsWith('http') ? blog.blogImage : `${API_BASE_URL}/uploads/${blog.blogImage}/`}
                alt={blog.title} className="rounded-2xl w-full object-cover border border-white/10" />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              {normalizedContent.intro.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">{titles.whatIs}</h2>
            {normalizedContent.whatIs.map((para, i) => <p key={i} className="mb-4">{para}</p>)}
          </div>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">{titles.benefits}</h2>
            {normalizedContent.benefits.description && <p className="mb-4">{normalizedContent.benefits.description}</p>}
            <ul className="list-disc list-inside space-y-4">
              {normalizedContent.benefits.items.map((item, i) => <li key={i}><strong>{item.title}:</strong> {item.desc}</li>)}
            </ul>
          </div>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">{titles.future}</h2>
            <p>{blog.content.future}</p>
          </div>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">{titles.howItWorks}</h2>
            <ol className="list-decimal list-inside space-y-4 mt-4">
              {normalizedContent.howItWorks.map((step, i) => <li key={i}><strong>{step.title}:</strong> {step.desc}</li>)}
            </ol>
          </div>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">{titles.final}</h2>
            {normalizedContent.final.map((para, i) => <p key={i} className="mb-4">{para}</p>)}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
