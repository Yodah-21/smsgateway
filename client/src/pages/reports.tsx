import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Menu,
  User,
  ChevronDown,
  MessageSquare,
  Clock,
  CreditCard,
  Users,
  Building,
  FileText,
  Wallet,
  DollarSign,
  Settings,
  BarChart3,
  Calendar,
  BarChart2,
  Phone,
  CalendarDays,
} from "lucide-react";

interface ReportType {
  id: string;
  title: string;
  icon: React.ElementType;
}

const reportTypes: ReportType[] = [
  {
    id: "dates",
    title: "Dates Report",
    icon: Calendar,
  },
  {
    id: "provider",
    title: "Provider Report", 
    icon: BarChart2,
  },
  {
    id: "phone",
    title: "Phone Number",
    icon: Phone,
  },
  {
    id: "provider-dates",
    title: "Provider Dates Report",
    icon: CalendarDays,
  },
];

export default function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { icon: BarChart3, label: "Dashboard" },
    { icon: MessageSquare, label: "Messages" },
    { icon: Clock, label: "Scheduling Bulk SMS" },
    { icon: CreditCard, label: "Sender Ids" },
    { icon: Users, label: "Accounts Management" },
    { icon: Building, label: "Providers" },
    { icon: FileText, label: "Reports", active: true },
    { icon: Wallet, label: "SMS Account Balances" },
    { icon: DollarSign, label: "Tariffs" },
    { icon: Settings, label: "Developer Portal" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-[hsl(213,87%,42%)] text-white px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 rounded-md text-white hover:text-white hover:bg-white/20"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <h1 className="ml-2 text-lg font-semibold">Innovation Messaging Portal</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <User className="w-4 h-4" />
              <span>telonetestuser InnovationSurname</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 bg-white shadow-sm h-screen sticky top-0 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
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
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl font-semibold text-gray-900">Reports</h1>
            </div>

            {/* Report Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {reportTypes.map((report) => {
                const Icon = report.icon;
                return (
                  <Card key={report.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[hsl(213,87%,42%)] transition-colors">
                          <Icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-700 group-hover:text-[hsl(213,87%,42%)] transition-colors">
                          {report.title}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}