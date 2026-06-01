'use client';
import React,{useState}from "react";

function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };
  return (
    <section className="w-full py-24">
      <div className="w-full px-5">
        <div className="max-w-2xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-Gotham text-white mb-2">
            Subscribe to Our
          </h2>
          <h2 className="text-4xl lg:text-5xl font-Gotham text-white/50 mb-6">
            Blog Newsletter
          </h2>

          {/* Description */}
          <p className="text-sm text-white leading-relaxed mb-8">
            Stay updated with the latest insights, trends, and expert opinions in technology, design, and digital transformation.
            <br />
            Get valuable content delivered straight to your inbox no spam, just smart reads.
          </p>

          {/* Email Input Form */}
          <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row sm:gap-0 items-center justify-center max-w-[570px] sm:h-[61px] mx-auto sm:bg-white/5 sm:rounded-lg sm:border sm:border-[#EAECF0] sm:p-1.5"
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 w-full bg-white/5 sm:bg-transparent border border-white/20 sm:border-none rounded-lg sm:rounded-none outline-none px-4 lg:px-5 py-3 text-[13px] lg:text-[14px] text-white placeholder-white/50"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 lg:px-6 py-3 bg-gradient-to-r from-[#0B2CC3] via-[#4D6DFF] to-[#6D87FF] text-white text-[13px] lg:text-[14px] font-medium rounded-lg hover:opacity-90 transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
        </div>
      </div>
    </section>
  );
}

export default BlogNewsletter;
