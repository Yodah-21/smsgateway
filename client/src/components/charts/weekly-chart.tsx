import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { mockWeeklyData } from "@/lib/mock-data";

export default function WeeklyChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={mockWeeklyData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis dataKey="day" stroke="#6B7280" />
          <YAxis stroke="#6B7280" domain={[0, 1]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="totalSent"
            name="Total Sent"
            stroke="hsl(213, 87%, 42%)"
            fill="hsla(213, 87%, 42%, 0.1)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="sentSuccess"
            name="Sent Success"
            stroke="hsl(142, 76%, 36%)"
            fill="hsla(142, 76%, 36%, 0.1)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="failed"
            name="Failed"
            stroke="hsl(0, 84%, 60%)"
            fill="hsla(0, 84%, 60%, 0.1)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
