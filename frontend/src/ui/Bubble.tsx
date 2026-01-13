import React from "react";

interface BubblePosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

interface BubbleProps {
  position: BubblePosition;
  size?: number; // diameter in px
  color?: string; // neon color
  blur?: number; // blur intensity
  opacity?: number;
}

const Bubble: React.FC<BubbleProps> = ({
  position,
  size = 300,
  color = "#ff2d55",
  blur = 80,
  opacity = 0.6,
}) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity,

        // pixel-based positioning
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
      }}
    />
  );
};

export default Bubble;
