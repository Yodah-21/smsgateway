import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function WeeklyChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeeklyData() {
      try {
        const response = await fetch(
          "http://172.27.34.87:8080/telonenfe/sms/report/count/weekly"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        // Map backend fields to chart data
        const formattedData = result.map((item) => ({
          day: item.dayOfWeek,
          totalSent: item.totalCount,     // or item.count
          sentSuccess: item.countSuccess,
          failed: item.countFailed,
        }));

        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weekly data:", error);
        setLoading(false);
      }
    }

    fetchWeeklyData();
  }, []);

  if (loading) return <div>Loading chart...</div>;

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis dataKey="day" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
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
