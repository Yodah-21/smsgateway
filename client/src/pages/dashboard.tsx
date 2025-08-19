import { useEffect, useState } from "react";
import { BarChart3, MessageSquare, FileText } from "lucide-react";
import ProviderChart from "@/components/charts/provider-chart";
import WeeklyChart from "@/components/charts/weekly-chart";
import StatsCard from "@/components/ui/stats-card";
import SidebarLayout from "@/components/SidebarLayout";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCount: 0,
    countSuccess: 0,
    countFailed: 0,
    provider: "",
    country: "",
    retries: 0,
    dateStart: "",
    dateEnd: "",
    dateDelivered: "",
    dayOfWeek: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          "http://172.27.34.87:8080/telonenfe/sms/report/count"
        );
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();

        setStats({
          totalCount: data.totalCount || 0,
          countSuccess: data.countSuccess || 0,
          countFailed: data.countFailed || 0,
          provider: data.provider || "",
          country: data.country || "",
          retries: data.retries || 0,
          dateStart: data.dateStart || "",
          dateEnd: data.dateEnd || "",
          dateDelivered: data.dateDelivered || "",
          dayOfWeek: data.dayOfWeek || "",
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Unable to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <Navbar />
      <SidebarLayout>
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Sent Messages"
            value={loading ? "..." : stats.totalCount}
            bgColor="bg-blue-100"
            textColor="text-blue-900"
            valueColor="text-blue-800"
            borderColor="border-blue-500"
            iconBg="bg-blue-500"
            icon={BarChart3}
          />
          <StatsCard
            title="Success Messages"
            value={loading ? "..." : stats.countSuccess}
            bgColor="bg-green-100"
            textColor="text-green-900"
            valueColor="text-green-800"
            borderColor="border-green-500"
            iconBg="bg-green-500"
            icon={MessageSquare}
          />
          <StatsCard
            title="Failed Messages"
            value={loading ? "..." : stats.countFailed}
            bgColor="bg-orange-100"
            textColor="text-orange-900"
            valueColor="text-orange-800"
            borderColor="border-orange-500"
            iconBg="bg-orange-500"
            icon={FileText}
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded">
            {error}
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Provider Statistics */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Provider Statistics
            </h3>
            <ProviderChart />
          </div>

          {/* Weekly Statistics */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Statistics
            </h3>
            <WeeklyChart />
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
}
