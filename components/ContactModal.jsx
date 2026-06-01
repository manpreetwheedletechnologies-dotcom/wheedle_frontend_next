'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../lib/api';

const ContactModal = ({
  onClose,
  title = 'Contact Us',
  description = "Tell us about your goals, and we'll get in touch.",
  contactEmail,
  contactPhone,
  messagePlaceholder = 'Your message',
}) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [toastKey, setToastKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, phone: value });
  };

  const checkEmailExistence = (email) => {
    if (!email || !email.includes('@')) return true;
    const emailCompleteRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailCompleteRegex.test(email)) {
      showErrorToast('Please enter a valid email address.');
      return false;
    }
    const blockedDomains = ['mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com'];
    const domain = email.split('@')[1];
    if (blockedDomains.includes(domain)) {
      showErrorToast('Temporary email addresses are not allowed.');
      return false;
    }
    return true;
  };

  const showErrorToast = (message) => {
    setToastKey(Date.now());
    setAlert({ show: true, type: 'error', message });
    setTimeout(() => setAlert({ show: false }), 5000);
  };

  const showSuccessToast = (message) => {
    setToastKey(Date.now());
    setAlert({ show: true, type: 'success', message });
    setTimeout(() => setAlert({ show: false }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setAlert({ show: true, type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    if (!checkEmailExistence(formData.email)) return;
    const phoneRegex = /^\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      setAlert({ show: true, type: 'error', message: 'Please enter a valid 10-digit mobile number.' });
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/formleads/`, {
        name: formData.name, email: formData.email, phone: formData.phone, message: formData.message,
      });
      try {
        const emailjs = (await import('@emailjs/browser')).default;
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          { message: `Title: ${title}\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nMessage:\n${formData.message}` },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );
      } catch (emailError) {
        console.log('Email failed but data saved:', emailError);
      }
      showSuccessToast('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      showErrorToast('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4 sm:px-6">
      <AnimatePresence>
        <motion.div
          key="contactModal"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-4xl bg-[#040010] border border-white/20 rounded-2xl p-6 sm:p-8 lg:p-12 flex flex-col lg:flex-row gap-8 max-h-[90vh] overflow-y-auto"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white text-xl">✕</button>

          <div className="w-full lg:w-[300px] flex flex-col gap-4">
            <h2 className="text-white text-3xl sm:text-4xl lg:text-[46px] font-bold">{title}</h2>
            <p className="text-white/80 text-sm leading-relaxed">{description}</p>
            {contactEmail && (
              <div className="flex items-center gap-2 text-sm text-white">
                <span>✉</span> {contactEmail}
              </div>
            )}
            {contactPhone && (
              <div className="flex items-center gap-2 text-sm text-white">
                <span>📞</span> {contactPhone}
              </div>
            )}
          </div>

          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="bg-black rounded-xl p-5 sm:p-6 flex flex-col gap-4 shadow-[0_0_20px_rgba(90,130,255,0.3)]">
              {['name'].map((field) => (
                <input key={field} type="text" name={field} value={formData[field]} onChange={handleChange}
                  placeholder={`Your ${field}`} required
                  className="w-full h-10 px-3 rounded-md bg-white/10 text-white outline-none text-sm" />
              ))}
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                onBlur={(e) => checkEmailExistence(e.target.value)} placeholder="Your email" required
                className="w-full h-10 px-3 rounded-md bg-white/10 text-white outline-none text-sm" />
              <input type="tel" name="phone" value={formData.phone} onChange={handlePhoneChange}
                maxLength={10} placeholder="10-digit mobile number"
                className="w-full h-10 px-3 rounded-md bg-white/10 text-white outline-none text-sm" />
              <textarea name="message" value={formData.message} onChange={handleChange}
                placeholder={messagePlaceholder} required
                className="w-full h-24 px-3 py-2 rounded-md bg-white/10 text-white outline-none text-sm resize-none" />
              <button type="submit" disabled={loading}
                className={`h-11 rounded-full text-white text-sm font-medium transition ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-[#0B2CC3] via-[#1A45E5] to-[#0B2CC3] hover:scale-105'}`}>
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
                    Sending...
                  </div>
                ) : 'Send Message'}
              </button>
            </form>
          </div>

          <AnimatePresence>
            {alert.show && (
              <motion.div key={toastKey} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.3 }}
                className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[360px]">
                <div className={`relative overflow-hidden rounded-xl border p-4 text-white shadow-lg ${alert.type === 'success' ? 'bg-gradient-to-r from-[#0B2CC3] to-[#4D6DFF] border-[#6D87FF]' : 'bg-gradient-to-r from-[#7A0000] to-[#b30089] border-[#f44308]'}`}>
                  <p className="text-sm font-medium leading-snug">{alert.message}</p>
                  <motion.div initial={{ width: '100%' }} animate={{ width: '0%' }} transition={{ duration: 5, ease: 'linear' }} className="absolute bottom-0 left-0 h-[3px] bg-white/70" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default ContactModal;
