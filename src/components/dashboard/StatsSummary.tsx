import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, AlertTriangle, Calendar, Activity } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  bgColor: string;
  iconColor: string;
}

interface StatsSummaryProps {
  stats?: StatItem[];
}

const StatsSummary = ({ stats = defaultStats }: StatsSummaryProps) => {
  return (
    <div className="w-full bg-white p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  change,
  trend,
  bgColor,
  iconColor,
}: StatItem) => {
  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardContent className="p-0">
        <div className="flex items-center">
          <div
            className={`${bgColor} p-4 flex items-center justify-center h-full`}
          >
            <div
              className={`${iconColor} w-12 h-12 flex items-center justify-center rounded-full`}
            >
              {icon}
            </div>
          </div>
          <div className="p-4 flex-1">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold">{value}</h3>
              {change && (
                <span
                  className={`ml-2 text-xs font-medium ${
                    trend === "up"
                      ? "text-green-500"
                      : trend === "down"
                        ? "text-red-500"
                        : "text-gray-500"
                  }`}
                >
                  {trend === "up" ? "↑" : trend === "down" ? "↓" : ""} {change}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const defaultStats: StatItem[] = [
  {
    icon: <Activity size={24} className="text-white" />,
    label: "Active Exams",
    value: "24",
    change: "12% from last hour",
    trend: "up",
    bgColor: "bg-blue-600",
    iconColor: "bg-blue-700",
  },
  {
    icon: <Users size={24} className="text-white" />,
    label: "Students Monitored",
    value: "342",
    change: "8% from last hour",
    trend: "up",
    bgColor: "bg-green-600",
    iconColor: "bg-green-700",
  },
  {
    icon: <AlertTriangle size={24} className="text-white" />,
    label: "Suspicious Activities",
    value: "18",
    change: "5% from last hour",
    trend: "down",
    bgColor: "bg-red-600",
    iconColor: "bg-red-700",
  },
  {
    icon: <Calendar size={24} className="text-white" />,
    label: "Upcoming Exams",
    value: "7",
    change: "Today",
    trend: "neutral",
    bgColor: "bg-purple-600",
    iconColor: "bg-purple-700",
  },
];

export default StatsSummary;
