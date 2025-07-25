import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface TariffData {
  zwlSms: string;
  usdSms: string;
  status: string;
  lastUpdate: string;
}

const tariffData: TariffData[] = [
  {
    zwlSms: "0.13",
    usdSms: "0",
    status: "Active",
    lastUpdate: "1715762830074",
  },
];

export default function Tariffs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { icon: BarChart3, label: "Dashboard" },
    { icon: MessageSquare, label: "Messages" },
    { icon: Clock, label: "Scheduling Bulk SMS" },
    { icon: CreditCard, label: "Sender Ids" },
    { icon: Users, label: "Accounts Management" },
    { icon: Building, label: "Providers" },
    { icon: FileText, label: "Reports" },
    { icon: Wallet, label: "SMS Account Balances" },
    { icon: DollarSign, label: "Tariffs", active: true },
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
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">SMS Tariffs</h1>
            </div>

            {/* Data Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-medium text-gray-700 px-6 py-4">ZWL/SMS</TableHead>
                      <TableHead className="font-medium text-gray-700 px-6 py-4">USD/SMS</TableHead>
                      <TableHead className="font-medium text-gray-700 px-6 py-4">Status</TableHead>
                      <TableHead className="font-medium text-gray-700 px-6 py-4">Last Update</TableHead>
                      <TableHead className="font-medium text-gray-700 px-6 py-4">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tariffData.map((tariff, index) => (
                      <TableRow key={index} className="border-b border-gray-100">
                        <TableCell className="px-6 py-4 text-gray-900">{tariff.zwlSms}</TableCell>
                        <TableCell className="px-6 py-4 text-gray-900">{tariff.usdSms}</TableCell>
                        <TableCell className="px-6 py-4">
                          <span className="text-gray-600">{tariff.status}</span>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-gray-900">{tariff.lastUpdate}</TableCell>
                        <TableCell className="px-6 py-4">
                          <Button size="sm" className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 mt-6">
              <Button variant="outline" size="sm" className="text-gray-500 border-gray-300">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-[hsl(213,87%,42%)] text-white border-[hsl(213,87%,42%)]">
                1
              </Button>
              <Button variant="outline" size="sm" className="text-gray-500 border-gray-300">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}