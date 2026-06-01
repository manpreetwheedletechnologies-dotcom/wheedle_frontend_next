'use client';
export default function Button({
  children = "Hover me",
  className = "",
  showArrow = true,
  size = "md",
  padding= "6%",
  ...props
}) {
  const sizeClasses = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
<button
  {...props}
  style={{ padding }}
  className={`
    group relative inline-flex items-center justify-center
    overflow-hidden font-medium
    bg-white text-black transition-all duration-200
    hover:bg-black hover:text-white
    shadow-[0_10px_20px_-10px_rgba(0,0,0,0.35)]
    hover:shadow-neutral-600
    hover:-translate-y-[1px]
    cursor-pointer
    ${sizeClasses[size]} ${className}
    rounded-full
  `}
>
      <span className="flex items-center">
        {children}

        {showArrow && (
          <span
            className="
              ml-0 w-0 translate-x-[100%] opacity-0
              transition-all duration-200
              group-hover:ml-2 group-hover:w-6
              group-hover:translate-x-0 group-hover:opacity-100
              
            "
          >
            <svg
              viewBox="0 0 15 15"
              className="h-6 w-10"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.14645 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355Z"
              />
            </svg>
          </span>
        )}
      </span>
    </button>
  );
}
