import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/ui/stats-card";
import ProviderChart from "@/components/charts/provider-chart";
import WeeklyChart from "@/components/charts/weekly-chart";
import { mockStats } from "@/lib/mock-data";
import {
  Menu,
  BarChart3,
  MessageSquare,
  Clock,
  CreditCard,
  Users,
  Building,
  FileText,
  Wallet,
  DollarSign,
  Settings,
  ChevronDown,
  User
} from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: MessageSquare, label: "Messages" },
    { icon: Clock, label: "Scheduling Bulk SMS" },
    { icon: CreditCard, label: "Sender Ids" },
    { icon: Users, label: "Accounts Management" },
    { icon: Building, label: "Providers" },
    { icon: FileText, label: "Reports" },
    { icon: Wallet, label: "SMS Account Balances" },
    { icon: DollarSign, label: "Tariffs" },
    { icon: Settings, label: "Developer Portal" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <h1 className="ml-2 text-lg font-semibold text-gray-900">Innovation Messaging Portal</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>User</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`w-64 bg-white shadow-sm h-screen sticky top-0 transition-transform duration-300 z-50 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Retract Button */}
          <button
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600"
            onClick={() => setSidebarOpen(false)}
            aria-label="Retract Sidebar"
          >
            <span className="sr-only">Retract Sidebar</span>
            &larr;
          </button>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[hsl(213,87%,42%)] rounded-full flex items-center justify-center mr-3">
                <div className="w-4 h-4 border-2 border-white rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-[hsl(213,87%,42%)]">Innovation</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">The Future Is Better Together</p>
          </div>
          
          <nav className="mt-6">
            <ul className="space-y-1 px-4">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                let href = "#";
                if (item.label === "Dashboard") href = "/dashboard";
                if (item.label === "Messages") href = "/messages";
                if (item.label === "Scheduling Bulk SMS") href = "/bulk-sms";
                if (item.label === "Sender Ids") href = "/sender-ids";
                if (item.label === "Accounts Management") href = "/accounts";
                if (item.label === "Providers") href = "/providers";
                if (item.label === "Reports") href = "/reports";
                if (item.label === "SMS Account Balances") href = "/sms-balances";
                if (item.label === "Tariffs") href = "/tariffs";
                
                return (
                  <li key={index}>
                    <Link
                      href={href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        item.active
                          ? "text-white bg-[hsl(213,87%,42%)]"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Provider Statistics</h3>
              <ProviderChart />
            </div>

            {/* Weekly Statistics */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Statistics</h3>
              <WeeklyChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
