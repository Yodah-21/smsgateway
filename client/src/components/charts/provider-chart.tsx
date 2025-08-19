import { useEffect, useState } from "react";
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

export default function ProviderChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProviderData() {
      try {
        const response = await fetch(
          "http://172.27.34.87:8080/telonenfe/sms/report/count/providers"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        // Map backend fields to chart data
        const formattedData = result.map((item) => ({
          name: item.provider,
          totalSent: item.totalCount,      // or item.count if preferred
          sentSuccess: item.countSuccess,
          failed: item.countFailed,
        }));

        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching provider data:", error);
        setLoading(false);
      }
    }

    fetchProviderData();
  }, []);

  if (loading) return <div>Loading chart...</div>;

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
