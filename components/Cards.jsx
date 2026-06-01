'use client';
import Button from './Button_x';
import { useState } from "react";

const Cards = ({ img, title, desc, location }) => {
  const [open, setOpen] = useState(false);

  const words = desc.split(" ");
  const shortDesc = words.slice(0, 25).join(" ");
  const isLong = words.length > 25;

  return (
    <>
      <div
        className="bg-[#0E1228] rounded-[30px] h-[550px] flex flex-col overflow-hidden shadow-lg
        transition-all duration-300 hover:-translate-y-3 hover:scale-[1.03]
        hover:shadow-[0_20px_60px_rgba(41,52,228,0.35)]"
      >
        {/* Image */}
        {img && (
          <img
            src={img}
            alt={title}
            className="w-full h-[200px] object-cover"
          />
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 p-6 gap-3 bg-[#0B0F1A]">
          {/* Location / Label */}
          {location && (
            <span className="font-inter font-normal text-[12px] leading-[22px] text-[#2934E4]">
              {location}
            </span>
          )}

          {/* Title */}
          <h3 className="font-gotham font-normal text-white text-[24px] lg:text-[28px] leading-[32px] lg:leading-[38px]">
            {title}
          </h3>

          {/* Description */}
          <p className="font-inter font-normal text-[14px] leading-[24px] text-white">
            {isLong ? shortDesc + "..." : desc}

            {isLong && (
              <span
                onClick={() => setOpen(true)}
                className="text-blue-400 ml-2 cursor-pointer hover:underline"
              >
                Read More
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Popup Modal */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[720px]
      bg-[#0B0F1A] rounded-[28px]
      p-6 sm:p-10
      shadow-[0_30px_80px_rgba(0,0,0,0.7)]
      border border-white/10
      animate-scaleIn"
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4
        w-10 h-10 flex items-center justify-center
        rounded-full bg-white/5 hover:bg-white/10
        text-white text-xl"
            >
              ✕
            </button>

            <h3 className="font-gotham text-[24px] sm:text-[28px] mb-4 text-white">
              {title}
            </h3>

            <p className="font-inter text-[15px] sm:text-[16px] leading-[28px] text-white/85">
              {desc}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;

// import Button from './Button_x';
// import { useState } from "react";

// const Cards = ({ img, title, desc, location }) => {
//   const [open, setOpen] = useState(false);

//   const words = desc.split(" ");
//   const shortDesc = words.slice(0, 25).join(" ");
//   const isLong = words.length > 25;
//   return (
//     <>
//     <div
//       className="bg-[#0E1228] rounded-[30px] h-[550px] flex flex-col overflow-hidden shadow-lg
//       transition-all duration-300 hover:-translate-y-3 hover:scale-[1.03]
//       hover:shadow-[0_20px_60px_rgba(41,52,228,0.35)]"
//     >
//       {/* Image */}
//       {img && (
//         <img src={img} alt={title} className="w-full h-[200px] object-cover" />
//       )}

//       {/* Content */}
//       <div className="flex flex-col flex-1 p-6 gap-3 bg-[#0B0F1A]">
//         {/* Location / Label */}
//         {location && (
//           <span className="font-inter font-normal text-[12px] leading-[22px] text-[#2934E4]">
//             {location}
//           </span>
//         )}

//         {/* Title */}
//         <h3 className="font-gotham font-normal text-white text-[24px] lg:text-[28px] leading-[32px] lg:leading-[38px]">
//           {title}
//         </h3>

//         {/* Description */}
//         <p className="font-inter font-normal text-[14px] leading-[24px] text-white">
//           {isLong ? shortDesc + "..." : desc}

//           {isLong && (
//             <span
//               onClick={() => setOpen(true)}
//               className="text-blue-400 ml-2 cursor-pointer hover:underline"
//             >
//               Read More
//             </span>
//           )}
//         </p>

//         {/* Button */}
//         {/* <Button
//           size="md"
//           showArrow
//           className="mt-auto w-fit bg-white text-black text-[14px] font-medium rounded-full px-[19px] py-[9px] transition"
//           padding="12px 32px"
//         >
//           {buttonText}
//         </Button> */}
//       </div>

//       {/* Popup Modal */}
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 z-[9999] flex items-center justify-center px-4
//           bg-[linear-gradient(180deg,#0B2CC380_0%,#000000_100%)]
//           backdrop-blur-sm animate-fadeIn"
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="relative w-full max-w-[720px]
//             bg-[#0B0F1A] rounded-[28px]
//             p-6 sm:p-10
//             shadow-[0_30px_80px_rgba(0,0,0,0.7)]
//             border border-white/10
//             animate-scaleIn"
//           >
//             {/* Close Button */}
//             <button
//               onClick={() => setOpen(false)}
//               className="absolute top-4 right-4
//               w-10 h-10 flex items-center justify-center
//               rounded-full bg-white/5 hover:bg-white/10
//               text-white text-xl"
//             >
//               ✕
//             </button>

//             <h3 className="font-gotham text-[24px] sm:text-[28px] mb-4 text-white">
//               {title}
//             </h3>

//             <p className="font-inter text-[15px] sm:text-[16px] leading-[28px] text-white/85">
//               {desc}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default Cards;
