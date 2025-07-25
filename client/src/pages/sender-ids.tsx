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
  Trash2,
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
  Plus,
} from "lucide-react";

interface SenderID {
  id: string;
  name: string;
  status: string;
  userName: string;
}

const mockSenderIDs: SenderID[] = [
  {
    id: "1",
    name: "JAVASCRIPT SAGE",
    status: "ACTIVE",
    userName: "javascriptsage",
  },
  {
    id: "2", 
    name: "JAVASCRIPT SAGE",
    status: "ACTIVE",
    userName: "javascriptsage",
  },
  {
    id: "3",
    name: "JAVASCRIPT SAGE", 
    status: "ACTIVE",
    userName: "javascriptsage",
  },
  {
    id: "4",
    name: "JAVASCRIPT SAGE",
    status: "ACTIVE", 
    userName: "javascriptsage",
  },
  {
    id: "5",
    name: "JAVASCRIPT SAGE",
    status: "ACTIVE",
    userName: "javascriptsage",
  },
];

export default function SenderIds() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { icon: BarChart3, label: "Dashboard" },
    { icon: MessageSquare, label: "Messages" },
    { icon: Clock, label: "Scheduling Bulk SMS" },
    { icon: CreditCard, label: "Sender Ids", active: true },
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
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Sender IDs</h1>
              <div className="flex space-x-3">
                <Button className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Sender ID
                </Button>
              </div>
            </div>

            {/* Sender IDs Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700 py-4 px-6">Name</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4 px-6">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4 px-6">User Name</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4 px-6">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSenderIDs.map((sender) => (
                      <TableRow key={sender.id} className="border-b border-gray-100">
                        <TableCell className="py-6 px-6 font-medium">{sender.name}</TableCell>
                        <TableCell className="py-6 px-6">
                          <span className="text-gray-600">{sender.status}</span>
                        </TableCell>
                        <TableCell className="py-6 px-6 text-gray-600">{sender.userName}</TableCell>
                        <TableCell className="py-6 px-6">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}