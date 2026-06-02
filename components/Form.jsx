'use client';

import React, { useState, forwardRef } from 'react';
import API_BASE_URL from '../lib/api';

const Form = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', lookingFor: '', resume: null });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') setFormData({ ...formData, resume: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) { setMessage('Please enter a valid email address'); return; }
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) { setMessage('Phone number must be 10 digits'); return; }
    if (formData.resume) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(formData.resume.type)) { setMessage('Only PDF or Word files are allowed'); return; }
      if (formData.resume.size > 2 * 1024 * 1024) { setMessage('File size must be less than 2MB'); return; }
    }
    try {
      setLoading(true); setMessage('');
      const bodyData = new FormData();
      bodyData.append('name', formData.name); bodyData.append('email', formData.email);
      bodyData.append('phone', formData.phone); bodyData.append('lookingFor', formData.lookingFor);
      if (formData.resume) bodyData.append('resume', formData.resume);
      const res = await fetch(`${API_BASE_URL}/contact/`, { method: 'POST', body: bodyData });
      const data = await res.json();
if (res.ok) {
  setMessage('✔ Saved Successfully. We will contact you soon.');

  setFormData({
    name: '',
    email: '',
    phone: '',
    lookingFor: '',
    resume: null,
  });

  // reset file input
  e.target.reset();
} else {
  setMessage(data.message || 'Something went wrong');
}
    } catch { setMessage('Server error. Try again'); }
    setLoading(false);
  };

  return (
    <section ref={ref} className="relative w-full overflow-hidden">
      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[100px] pt-28 pb-16">
        <h2 className="font-gotham font-normal text-white text-[36px] sm:text-[44px] lg:text-[53px] leading-[48px] lg:leading-[63px] text-center">Ready to Join Us?</h2>
        <p className="font-inter font-medium text-white text-[16px] leading-[26px] text-center mt-4 max-w-[720px] mx-auto">Ready to grow your career with a team that values your potential? Join us.</p>
        <div className="mt-14 flex justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-[570px] bg-black rounded-[50px] p-10 flex flex-col gap-[30px] shadow-[0_0_80px_rgba(11,44,195,0.55)]">
            {[['name', 'text', 'Enter your name'], ['email', 'email', 'Enter your email']].map(([name, type, placeholder]) => (
              <div key={name} className="flex flex-col gap-2">
                <label className="text-white text-sm capitalize">{name}</label>
                <input name={name} type={type} value={formData[name]} onChange={handleChange} placeholder={placeholder} required
                  className="w-full h-[50px] bg-white/10 rounded-[10px] px-5 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#0B2CC3]" />
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Phone Number</label>
              <input name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })} maxLength={10} placeholder="Enter your phone number"
                className="w-full h-[50px] bg-white/10 rounded-[10px] px-5 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#0B2CC3]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Looking For?</label>
              <input name="lookingFor" value={formData.lookingFor} onChange={handleChange} placeholder="Enter your requirement"
                className="w-full h-[50px] bg-white/10 rounded-[10px] px-5 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#0B2CC3]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Upload Resume</label>
              <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange}
                className="w-full text-white file:bg-[#0B2CC3] file:text-white file:border-0 file:px-4 file:py-2 file:rounded-[6px]" />
              {formData.resume && <p className="text-xs text-gray-300">Selected: {formData.resume.name}</p>}
            </div>
            {message && <p className={`text-center text-sm ${message.includes('Successfully') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
            <button type="submit" disabled={loading}
              className="w-full h-[62px] rounded-[10px] text-white font-medium border border-[#355BFF] transition bg-[#0B2CC3] hover:bg-[#102FE0] disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Sending...' : 'Get a Call'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
});

Form.displayName = 'Form';
export default Form;
