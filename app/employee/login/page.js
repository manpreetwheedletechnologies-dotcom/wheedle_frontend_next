'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import API_BASE_URL from '../../../lib/api';
import Toast from '../../../components/admin/Toast';

export default function EmployeeLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      localStorage.setItem('adminToken', res.data.token);
      setToast({ message: 'Login successful!', type: 'success' });
      setTimeout(() => router.push('/employee/dashboard'), 1000);
    } catch (err) {
      const errorMsg = err?.response?.data?.message || 'Server error';
      if (errorMsg.toLowerCase().includes('email')) {
        setEmailError(errorMsg);
      } else if (errorMsg.toLowerCase().includes('password')) {
        setPasswordError(errorMsg);
      } else {
        setGeneralError(errorMsg);
        setToast({ message: errorMsg, type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A061F] via-[#1A0E42] to-[#2E1A6D] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo / Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 mb-4 shadow-lg">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-white">Staff Portal</h1>
            <p className="text-white/50 text-sm mt-1">Wheedle Technologies Task Management</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@wheedle.ai"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30
                  outline-none focus:border-violet-400 focus:bg-white/15 transition text-sm"
              />
              {emailError && <p className="text-red-400 text-xs font-semibold mt-1">{emailError}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wide">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/30 rounded-2xl px-4 py-3 outline-none focus:border-violet-500 focus:bg-white/20 transition text-sm font-medium"
              />
              {passwordError && <p className="text-red-400 text-xs font-semibold mt-1">{passwordError}</p>}
            </div>

            {generalError && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm font-medium px-4 py-3 rounded-2xl">
                {generalError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700
                disabled:opacity-60 text-white font-bold rounded-xl shadow-lg hover:shadow-violet-500/30 transition text-sm"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-white/30 text-xs text-center mt-6">
            Access restricted to authorised staff only.
          </p>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
