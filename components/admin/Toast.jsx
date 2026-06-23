'use client';
import React, { useEffect } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

const Toast = ({ title, message, type = "success", onClose, duration = 3000, onClick }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    let bgColor = "bg-green-500";
    let Icon = CheckCircle;
    
    if (type === "error") {
        bgColor = "bg-red-500";
        Icon = AlertCircle;
    } else if (type === "notification") {
        bgColor = "bg-slate-800";
        // Using generic bell or info for notifications
        Icon = AlertCircle; 
    }

    return (
        <div 
            className={`fixed top-5 right-5 z-[9999] flex items-start gap-3 px-6 py-4 rounded-xl shadow-2xl text-white ${bgColor} ${onClick ? 'cursor-pointer hover:opacity-95' : ''} max-w-sm`}
            onClick={(e) => {
                if (onClick) {
                    onClick();
                    onClose();
                }
            }}
        >
            <div className="mt-0.5">
                <Icon size={20} />
            </div>
            <div className="flex-1">
                {title && <h4 className="font-bold text-sm mb-1">{title}</h4>}
                <p className="font-medium text-sm text-gray-200">{message}</p>
            </div>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }} 
                className="ml-2 hover:opacity-80 transition"
            >
                <X size={18} />
            </button>
        </div>
    );
};

export default Toast;
