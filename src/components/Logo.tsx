interface LogoProps {
  className?: string; // For container styling
  variant?: "light" | "dark"; // For text color adaptation
}

export default function Logo({ className = "", variant = "dark" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-black";
  const mutedColor = variant === "light" ? "text-white/60" : "text-zinc-500";
  const hoverColor =
    variant === "light" ? "group-hover:text-white" : "group-hover:text-black";

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* MB Icon - Geometric & Interlocking Style Gimmick */}
      <div className="relative mb-1.5 group">
        <svg
          width="50"
          height="32"
          viewBox="0 0 40 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-colors duration-300 ${textColor}`}
        >
          {/* Interlocking M & B - Minimalist architectural style */}
          <path
            d="M4 22V2H12L16 12L20 2H28V22"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26 2H33C35.5 2 37.5 4 37.5 7C37.5 9 36.5 10.5 35 11.5C36.5 12.5 37.5 14 37.5 16C37.5 19 35.5 21 32 21H26"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Subtle Gimmick: The Dot of Authenticity */}
          <circle
            cx="21"
            cy="12"
            r="1.5"
            fill="currentColor"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"
          />
        </svg>
      </div>

      {/* Brand Name Text */}
      <span
        className={`luxury-serif text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 ${textColor} ${hoverColor}`}
      >
        MB Brandname
      </span>
      <span
        className={`text-[7px] tracking-[0.4em] uppercase font-bold opacity-40 mt-0.5 ${mutedColor}`}
      >
        Tokyo Archive • Authentic Direct
      </span>
    </div>
  );
}
