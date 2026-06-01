'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../lib/api';

export default function Newsletter({ content = {
  titleLine1: 'Stay Ahead in the Digital World:',
  titleLine2Primary: 'Latest Insights & ',
  titleLine2Secondary: 'Updates',
  description: 'Stay updated with the latest in Technology, IT trends, and Security with one single click.',
  inputType: 'email',
  inputPlaceholder: 'your@email.com',
  buttonText: 'Get the Tech Brief',
  successMessage: 'Your contact is successfully registered for newsletter',
}}) {
  const [value, setValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\+?[0-9]{7,15}$/.test(phone.replace(/[\s-]/g, ''));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setError('');
    if (content.inputType === 'email' && !validateEmail(value)) { setError('Please enter a valid email address'); return; }
    if (content.inputType === 'tel' && !validatePhone(value)) { setError('Please enter a valid phone number'); return; }
    try {
      const response = await fetch(`${API_BASE_URL}/leads/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: content.inputType === 'email' ? 'email' : 'phone', value }),
      });
      const data = await response.json();
      if (!response.ok) { setError(data.message || 'Something went wrong'); return; }
      setShowPopup(true);
      setValue('');
      setTimeout(() => setShowPopup(false), 3000);
    } catch {
      setError('Server error. Please try again.');
    }
  };

  return (
    <section className="w-full py-2 lg:py-24 min-h-[20vh] relative">
      <div className="w-full px-4 lg:px-[100px]">
        <div className="w-full rounded-[20px] lg:rounded-[30px] py-10 lg:py-16 px-4 lg:px-12">
          <div className="text-center max-w-[800px] mx-auto">
            <div className="animate-bounce">
              <h2 className="text-4xl lg:text-5xl font-gotham text-white">{content.titleLine1}</h2>
              <h2 className="text-4xl lg:text-5xl font-gotham text-white">
                <span className="text-white">{content.titleLine2Primary}</span>
                <span className="text-white/50">{content.titleLine2Secondary}</span>
              </h2>
            </div>
            <br />
            <p className="text-[12px] lg:text-[15px] text-white leading-[1.6] lg:leading-[1.7] mb-6 lg:mb-10 px-2">{content.description}</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-0 items-center justify-center max-w-[570px] sm:h-[61px] mx-auto sm:bg-white/5 sm:rounded-lg sm:border sm:border-[#EAECF0] sm:p-1.5">
              <input type={content.inputType} required placeholder={content.inputPlaceholder} value={value} onChange={(e) => setValue(e.target.value)}
                className="flex-1 w-full bg-white/5 sm:bg-transparent border border-white/20 sm:border-none rounded-lg sm:rounded-none outline-none px-4 lg:px-5 py-3 text-[13px] lg:text-[14px] text-white placeholder-white/50" />
              <button type="submit" className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-5 lg:px-6 py-3 bg-gradient-to-r from-[#0B2CC3] via-[#4D6DFF] to-[#6D87FF] text-white text-[13px] lg:text-[14px] font-medium rounded-lg hover:opacity-90 transition-all whitespace-nowrap border-2 border-blue-300">
                {content.buttonText}
              </button>
            </form>
            {error && <p className="text-red-400 text-sm mt-3 max-w-[570px] mx-auto text-left">{error}</p>}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showPopup && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.4 }} className="fixed bottom-6 right-6 z-50">
            <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-gradient-to-r from-[#0B2CC3] via-[#4D6DFF] to-[#6D87FF] text-white shadow-2xl max-w-[340px]">
              <span className="text-xl">✅</span>
              <p className="text-sm leading-snug">{content.successMessage}</p>
              <button onClick={() => setShowPopup(false)} className="ml-auto text-white/70 hover:text-white">✕</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
