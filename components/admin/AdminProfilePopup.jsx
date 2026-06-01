'use client';
import React, { useEffect, useState } from "react";
import { X, User, Mail, Phone, Pencil } from "lucide-react";
import axios from "axios";
import API_BASE_URL from '../../lib/api';

const AdminProfilePopup = ({ isOpen, onClose }) => {
  const [editMode, setEditMode] = useState(false);

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  // FETCH PROFILE
  useEffect(() => {
    if (isOpen) {
      fetchAdmin();
    }
  }, [isOpen]);

  const fetchAdmin = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/profile/`);

      // ✅ FIXED HERE
      setAdmin(res.data.profile);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {
    setAdmin({
      ...admin,

      [e.target.name]: e.target.value,
    });
  };

  // SAVE PROFILE

  const handleSave = async () => {

    const res = await axios.put(
      `${API_BASE_URL}/profile/`,
      admin
    );

    setMessage(res.data.message); // ✅ show backend message
    setTimeout(() => {

      setMessage("");

    }, 3000);
    setEditMode(false);

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="pointer-events-auto fixed right-4 top-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white rounded-xl shadow-2xl border p-6 animate-slideIn">
        {/* CLOSE BUTTON */}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* EDIT ICON */}

        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="absolute top-4 left-4 text-gray-400 hover:text-black"
          >
            <Pencil size={20} />
          </button>
        )}

        {/* HEADER */}

        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-br from-[#2E1A6D] to-[#4B2D73] p-4 rounded-full shadow-lg">
            <User className="text-white" size={28} />
          </div>

          <h2 className="text-xl font-semibold mt-3 text-gray-800">
            Admin Profile
          </h2>
        </div>

        {/* DETAILS */}

        <div className="space-y-5">
          {/* NAME */}

          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <User className="text-[#2E1A6D]" size={18} />
            </div>

            <div className="w-full">
              <p className="text-sm text-gray-500">Name</p>

              {editMode ? (
                <input
                  name="name"
                  value={admin.name}
                  onChange={handleChange}
                  className="border p-2 w-full rounded text-gray-900 outline-none"
                />
              ) : (
                <p className="font-semibold text-gray-800">{admin.name}</p>
              )}
            </div>
          </div>

          {/* EMAIL */}

          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Mail className="text-[#2E1A6D]" size={18} />
            </div>

            <div className="w-full">
              <p className="text-sm text-gray-500">Email</p>

              {editMode ? (
                <input
                  name="email"
                  value={admin.email}
                  onChange={handleChange}
                  className="border p-2 w-full rounded text-gray-900 outline-none"
                />
              ) : (
                <p className="font-semibold text-gray-800">{admin.email}</p>
              )}
            </div>
          </div>

          {/* PHONE */}

          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Phone className="text-[#2E1A6D]" size={18} />
            </div>

            <div className="w-full">
              <p className="text-sm text-gray-500">Phone</p>

              {editMode ? (
                <input
                  name="phone"
                  value={admin.phone}
                  onChange={handleChange}
                  className="border p-2 w-full rounded text-gray-900 outline-none"
                />
              ) : (
                <p className="font-semibold text-gray-800">{admin.phone}</p>
              )}
            </div>
          </div>

          {/* SAVE BUTTON */}

          {editMode && (
            <button
              onClick={handleSave}
              className="w-full bg-[#2E1A6D] text-white py-2 rounded-lg hover:bg-[#452c8c]"
            >
              Save
            </button>
          )}

          {message && (
            <p className="text-green-600 text-center font-medium mt-2">
              {message}
            </p>
          )}
        </div>
      </div>

      {/* ANIMATION */}

      <style>
        {`

        @keyframes slideIn {

          from {

            opacity: 0;

            transform: translate(100%, -50%);

          }

          to {

            opacity: 1;

            transform: translate(0, -50%);

          }

        }


        .animate-slideIn {

          animation: slideIn 0.3s ease;

        }

        `}
      </style>
    </div>
  );
};

export default AdminProfilePopup;

// import React from "react";
// import { X, User, Mail, Phone } from "lucide-react";

// const AdminProfilePopup = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 pointer-events-none">

//       {/* Popup Card */}
//       <div
//         className="
//         pointer-events-auto
//         fixed
//         right-4
//         top-1/2
//         -translate-y-1/2
//         w-[90%]
//         max-w-sm
//         bg-white
//         rounded-xl
//         shadow-2xl
//         border
//         p-6
//         animate-slideIn
//         "
//       >

//         {/* Close Button */}

//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-black"
//         >
//           <X size={22} />
//         </button>

//         {/* Header */}

//         <div className="flex flex-col items-center mb-6">

//           <div className="bg-gradient-to-br from-[#2E1A6D] to-[#4B2D73] p-4 rounded-full shadow-lg">
//             <User className="text-white" size={28} />
//           </div>

//           <h2 className="text-xl font-semibold mt-3 text-gray-800">
//             Admin Profile
//           </h2>

//         </div>

//         {/* Details */}

//         <div className="space-y-5">

//           {/* Name */}

//           <div className="flex items-center gap-4">

//             <div className="bg-purple-100 p-3 rounded-full">
//               <User className="text-[#2E1A6D]" size={18} />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Name</p>
//               <p className="font-semibold text-gray-800">
//                 Admin Name
//               </p>
//             </div>

//           </div>

//           {/* Email */}

//           <div className="flex items-center gap-4">

//             <div className="bg-purple-100 p-3 rounded-full">
//               <Mail className="text-[#2E1A6D]" size={18} />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Email</p>
//               <p className="font-semibold text-gray-800">
//                 info@wheedletechnologies.ai
//               </p>
//             </div>

//           </div>

//           {/* Phone */}

//           <div className="flex items-center gap-4">

//             <div className="bg-purple-100 p-3 rounded-full">
//               <Phone className="text-[#2E1A6D]" size={18} />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Phone</p>
//               <p className="font-semibold text-gray-800">
//                 +91 9717672561
//               </p>
//             </div>

//           </div>

//         </div>

//       </div>

//       {/* Animation */}

//       <style>
//         {`
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translate(100%, -50%);
//           }
//           to {
//             opacity: 1;
//             transform: translate(0, -50%);
//           }
//         }

//         .animate-slideIn {
//           animation: slideIn 0.3s ease;
//         }
//         `}
//       </style>

//     </div>
//   );
// };

// export default AdminProfilePopup;
