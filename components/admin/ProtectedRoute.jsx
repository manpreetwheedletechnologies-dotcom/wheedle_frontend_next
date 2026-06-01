'use client';
import React, { useEffect, useState } from "react";
import API_BASE_URL from '../../lib/api';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verify = async () => {
      
      try {
      const token = localStorage.getItem("adminToken");
      setIsValid(true)
      setLoading(false)
     
      if (!token) {
        router.push('/admin/login');
        return;
      }

        
      } catch (err) {
         console.error(err);
         
      } 
    };

    verify();
  }, []);

  if (loading) {
    return <div className="text-white p-10">Checking authentication...</div>;
  }

  return isValid ? children : null;
};

export default ProtectedRoute;
