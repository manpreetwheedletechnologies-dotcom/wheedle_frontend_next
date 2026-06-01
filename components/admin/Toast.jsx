'use client';
import React, { useEffect } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
    const Icon = type === "success" ? CheckCircle : AlertCircle;

    return (
        <div className={`fixed top-5 right-5 z-[9999] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl text-white animate-slideIn ${bgColor}`}>
            <Icon size={20} />
            <p className="font-semibold text-sm">{message}</p>
            <button onClick={onClose} className="ml-2 hover:opacity-80 transition">
                <X size={18} />
            </button>
        </div>
    );
};

export default Toast;
