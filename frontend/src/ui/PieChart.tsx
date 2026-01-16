import React from "react";

interface PieChartProps {
  watched: number;
  total: number;
  size?: number;
}

const PieChart: React.FC<PieChartProps> = ({
  watched,
  total,
  size = 100,
}) => {
  const percentage = total > 0 ? (watched / total) * 100 : 0;
  const radius = size / 2 - 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(55, 65, 81)"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#ef4444"
          strokeWidth="8"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="text-center">
        <div className="text-2xl font-bold text-red-400">{Math.round(percentage)}%</div>
        <div className="text-xs text-gray-400">
          {watched} / {total}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
