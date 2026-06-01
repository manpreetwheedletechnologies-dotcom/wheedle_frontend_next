'use client';
import React, { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import API_BASE_URL from '../../lib/api';

const AdminLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      console.log('dkdoenodnoe',res);
      localStorage.setItem("adminToken", res.data.token);
      if (res.data.message == "Login success") {

        router.push('/admin/dashboard');
      }

      // router.push('/admin/dashboard');
    } catch (err) {
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(180deg,#040010 0%,#03104C 50%,#0B2CC3 100%)",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="bg-black w-full max-w-md p-10 rounded-[20px] shadow-[0_0_40px_rgba(11,44,195,0.35)]"
      >
        {/* Heading */}

        <h2 className="text-white text-3xl font-semibold mb-8 text-center">
          Admin Login
        </h2>

        {/* Error */}

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Email */}

        <div className="mb-5">
          <label className="text-gray-300 block mb-2">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            className="
            w-full
            px-4
            py-3
            rounded-xl
            text-white
            bg-gradient-to-r
            from-[#1a1a1a]
            to-[#2a2a2a]
            border
            border-gray-700
            focus:border-[#0B2CC3]
            focus:outline-none
            placeholder-gray-500
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}

        <div className="mb-8">
          <label className="text-gray-300 block mb-2">Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            className="
            w-full
            px-4
            py-3
            rounded-xl
            text-white
            bg-gradient-to-r
            from-[#1a1a1a]
            to-[#2a2a2a]
            border
            border-gray-700
            focus:border-[#0B2CC3]
            focus:outline-none
            placeholder-gray-500
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}

        <button
          type="submit"
          className="
          w-full
          py-3
          rounded-xl
          text-white
          font-medium
          bg-[#0B2CC3]
          hover:bg-blue-700
          transition
          duration-300
          shadow-[0_0_20px_rgba(11,44,195,0.6)]
          "
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
