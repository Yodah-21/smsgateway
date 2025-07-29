import { mockStats } from "@/lib/mock-data";
import { BarChart3, MessageSquare, FileText } from "lucide-react";
import ProviderChart from "@/components/charts/provider-chart";
import WeeklyChart from "@/components/charts/weekly-chart";
import StatsCard from "@/components/ui/stats-card";
import SidebarLayout from "@/components/SidebarLayout";

export default function Dashboard() {
  return (
    <SidebarLayout>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Sent Messages"
          value={mockStats.totalSent}
          bgColor="bg-blue-100"
          textColor="text-blue-900"
          valueColor="text-blue-800"
          borderColor="border-blue-500"
          iconBg="bg-blue-500"
          icon={BarChart3}
        />
        <StatsCard
          title="Success Messages"
          value={mockStats.successSent}
          bgColor="bg-green-100"
          textColor="text-green-900"
          valueColor="text-green-800"
          borderColor="border-green-500"
          iconBg="bg-green-500"
          icon={MessageSquare}
        />
        <StatsCard
          title="Failed Messages"
          value={mockStats.failedSent}
          bgColor="bg-orange-100"
          textColor="text-orange-900"
          valueColor="text-orange-800"
          borderColor="border-orange-500"
          iconBg="bg-orange-500"
          icon={FileText}
        />
      </div>

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
  );
}
