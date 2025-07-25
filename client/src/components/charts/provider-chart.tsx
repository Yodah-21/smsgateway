import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { mockProviderData } from "@/lib/mock-data";

export default function ProviderChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={mockProviderData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis dataKey="name" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar
            dataKey="totalSent"
            name="Total Sent"
            fill="hsl(213, 87%, 42%)"
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          />
          <Bar
            dataKey="sentSuccess"
            name="Sent Success"
            fill="hsl(142, 76%, 36%)"
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          />
          <Bar
            dataKey="failed"
            name="Failed"
            fill="hsl(0, 84%, 60%)"
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
