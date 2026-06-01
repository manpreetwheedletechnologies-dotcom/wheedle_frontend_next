'use client';
const Badge = ({ text, margin = "mb-6 sm:mb-6 md:mb-7 lg:mb-5" }) => {
    return (
          <div className={`inline-flex items-center justify-center 
          px-3 py-2 
          sm:px-5 sm:py-2.5 
          lg:px-6 lg:py-3 
          rounded-full 
          border border-blue-400/20 
          bg-blue-600/20 
          backdrop-blur-sm 
          text-[10px] 
          sm:text-[11px] 
          md:text-[12px] 
          lg:text-[13px] 
          font-semibold 
          tracking-[0.1em] 
          text-white/90 
          uppercase 
          ${margin}`}>
            {text}
        </div>
    );
};

export default Badge;
