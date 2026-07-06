import React from "react";

interface MitraganLogoProps {
  className?: string;
  showText?: boolean;
  size?: number; // width/height for emblem
  theme?: "light" | "dark";
  align?: "center" | "left" | "responsive";
}

export default function MitraganLogo({
  className = "",
  showText = true,
  size = 64,
  theme = "dark",
  align = "center",
}: MitraganLogoProps) {
  const strokeColor = theme === "dark" ? "currentColor" : "#000000";
  const textColor = theme === "dark" ? "text-white" : "text-[#070709]";
  const fillColor = theme === "dark" ? "#09090C" : "#ffffff";

  const alignContainerClass =
    align === "left"
      ? "items-start justify-start text-left"
      : align === "responsive"
      ? "items-center lg:items-start justify-center lg:justify-start"
      : "items-center justify-center text-center";

  const alignTextClass =
    align === "left"
      ? "text-left items-start justify-start"
      : align === "responsive"
      ? "text-center lg:text-left items-center lg:items-start"
      : "text-center items-center justify-center";

  const flexRowClass =
    align === "left"
      ? "justify-start"
      : align === "responsive"
      ? "justify-center lg:justify-start"
      : "justify-center";

  return (
    <div className={`flex flex-col ${alignContainerClass} ${className}`}>
      {/* 100% Symmetrical Pixel-Perfect Ultra-High-Fidelity SVG Emblem matching the uploaded logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300"
      >
        {/* Main Clockwise Outer Arc (starts at bottom-left node, sweeps around to top-right) */}
        <path
          d="M 46,146 A 71,71 0 1,1 148,48"
          stroke={strokeColor}
          strokeWidth="6.5"
          strokeLinecap="round"
        />

        {/* Bottom-Right Arc (curves below the circuit branches) */}
        <path
          d="M 168,120 A 71,71 0 0,1 90,170"
          stroke={strokeColor}
          strokeWidth="6.5"
          strokeLinecap="round"
        />

        {/* Bottom-Left Terminal Circle Node */}
        <circle
          cx="46"
          cy="146"
          r="7"
          stroke={strokeColor}
          strokeWidth="6.5"
          fill={fillColor}
        />

        {/* Top-Right Circuit Node 1 (Highest, with diagonal step down) */}
        <path
          d="M 148,48 L 158,58 L 176,58"
          stroke={strokeColor}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="182"
          cy="58"
          r="7"
          stroke={strokeColor}
          strokeWidth="6.5"
          fill={fillColor}
        />

        {/* Top-Right Circuit Node 2 (Middle, with diagonal step down) */}
        <path
          d="M 160,72 L 170,82 L 188,82"
          stroke={strokeColor}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="194"
          cy="82"
          r="7"
          stroke={strokeColor}
          strokeWidth="6.5"
          fill={fillColor}
        />

        {/* Top-Right Circuit Node 3 (Lowest, straight horizontal) */}
        <path
          d="M 169,106 L 200,106"
          stroke={strokeColor}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="206"
          cy="106"
          r="7"
          stroke={strokeColor}
          strokeWidth="6.5"
          fill={fillColor}
        />

        {/* Central Figure Front Layer: Two shoulders and the central "V" in a single continuous path */}
        <path
          d="M 50,115 C 50,95 56,85 70,85 L 100,115 L 130,85 C 144,85 150,95 150,115"
          stroke={strokeColor}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central Figure Back Layer: Arch (Dome) of the middle/rear figure */}
        <path
          d="M 78,85 A 30,30 0 0,1 122,85"
          stroke={strokeColor}
          strokeWidth="6.5"
          strokeLinecap="round"
        />

        {/* Left and Right Torso/Leg Columns */}
        <path
          d="M 84,95 L 84,134"
          stroke={strokeColor}
          strokeWidth="6.5"
          strokeLinecap="butt"
        />
        <path
          d="M 116,95 L 116,134"
          stroke={strokeColor}
          strokeWidth="6.5"
          strokeLinecap="butt"
        />

        {/* Central Figure Heads (Three solid circles) */}
        {/* Left Head */}
        <circle cx="68" cy="64" r="11" fill={strokeColor} />
        {/* Right Head */}
        <circle cx="132" cy="64" r="11" fill={strokeColor} />
        {/* Center/Rear Head */}
        <circle cx="100" cy="48" r="11" fill={strokeColor} />
      </svg>

      {showText && (
        <div className={`mt-4 space-y-2 select-none pointer-events-none flex flex-col ${alignTextClass}`}>
          {/* Stylized wordmark using geometric glyph representation */}
          <h1 className={`text-2xl font-bold tracking-[0.25em] font-sans ${textColor} uppercase flex items-center justify-center`}>
            <span>M I T R</span>
            <span className="text-[1.05em] font-light font-sans mx-[0.03em] relative -top-[0.03em]">Λ</span>
            <span>G</span>
            <span className="text-[1.05em] font-light font-sans mx-[0.03em] relative -top-[0.03em]">Λ</span>
            <span>N</span>
          </h1>

          {/* Subtitle baseline */}
          <div className={`flex items-center gap-3 ${flexRowClass}`}>
            <span className="h-[1px] w-5 bg-current opacity-30" />
            <p className="text-[8px] font-mono tracking-[0.4em] uppercase text-gray-400 font-medium whitespace-nowrap">
              IDEA TO REALITY
            </p>
            <span className="h-[1px] w-5 bg-current opacity-30" />
          </div>
        </div>
      )}
    </div>
  );
}
