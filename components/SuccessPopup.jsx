'use client';
import React from "react";

function SuccessPopup({ message, type = "success" }) {
  if (!message) return null;

  const styles = {
    success: "bg-green-500",
    error: "bg-red-500",
    delete: "bg-yellow-500",
  };

  const icons = {
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),

    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),

    delete: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 7h12M9 7V4h6v3m-7 4v6m4-6v6"
        />
      </svg>
    ),
  };

  return (
    <div className="fixed top-6 right-6 z-50 animate-fadeIn">
      <div
        className={`flex items-center gap-3 text-white px-5 py-3 rounded-lg shadow-lg ${styles[type]}`}
      >
        {icons[type]}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}

export default SuccessPopup;


// import React from "react";

// function SuccessPopup({ message }) {
//   if (!message) return null;

//   return (
//     <div className="fixed top-6 right-6 z-50 animate-fadeIn">
//       <div className="flex items-center gap-3 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg">

//         {/* Green Tick */}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-6 h-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={3}
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//         </svg>

//         <span className="font-medium">{message}</span>
//       </div>
//     </div>
//   );
// }

// export default SuccessPopup;