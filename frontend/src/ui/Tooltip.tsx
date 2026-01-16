import { type ReactNode } from "react";

interface TooltipProps {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
}

const positionClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export default function Tooltip({
  text,
  position = "top",
  children,
}: TooltipProps) {
  return (
    <div className="relative inline-block group">
      {children}

      <span
        className={`absolute z-50 whitespace-nowrap
          ${positionClasses[position]}
          opacity-0 group-hover:opacity-100
          scale-95 group-hover:scale-100
          transition-all duration-200
          bg-black text-white text-xs px-2 py-1 rounded`}
      >
        {text}
      </span>
    </div>
  );
}
