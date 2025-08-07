import { LucideIcon } from "lucide-react";
import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  bgColor: string;
  textColor: string;
  valueColor: string;
  borderColor: string;
  iconBg: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export default function StatsCard({
  title,
  value,
  bgColor,
  textColor,
  valueColor,
  borderColor,
  iconBg,
  icon: Icon,
  onClick,
}: StatsCardProps) {
  return (
    <div
      className={`${bgColor} rounded-xl p-6 border-l-4 ${borderColor} transition cursor-pointer hover:shadow-lg hover:scale-[1.03]`}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      style={onClick ? { outline: "none" } : {}}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-lg font-semibold ${textColor} mb-2`}>{title}</h3>
          <p className={`text-3xl font-bold ${valueColor}`}>
            {value.toLocaleString()}
          </p>
        </div>
        <div className={`${iconBg} p-3 rounded-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
}
