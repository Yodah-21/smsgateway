import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
  Download,
  Send,
  FileText,
  User,
  ChevronDown,
  MessageSquare,
  Clock,
  CreditCard,
  Users,
  Building,
  Wallet,
  DollarSign,
  Settings,
  BarChart3,
} from "lucide-react";

interface Message {
  id: string;
  providerName: string;
  type: string;
  message: string;
  status: string;
  destinationAddress: string;
  sourceAddress: string;
  requestType: string;
  dateReceived: string;
  accountCode: string;
}

const mockMessages: Message[] = [
  // Empty array to show "No Data" state with floating dots
];

export default function Messages() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigationItems = [
    { icon: BarChart3, label: "Dashboard" },
    { icon: MessageSquare, label: "Messages", active: true },
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
              <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
              <div className="flex space-x-3">
                <Button className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Export to Excel
                </Button>
                <Button className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search By Any..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full max-w-md"
                />
              </div>
            </div>

            {/* Messages Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold text-gray-700">Provider Name</TableHead>
                      <TableHead className="font-semibold text-gray-700">Type</TableHead>
                      <TableHead className="font-semibold text-gray-700">Message</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Destination Address</TableHead>
                      <TableHead className="font-semibold text-gray-700">Source Address</TableHead>
                      <TableHead className="font-semibold text-gray-700">Request Type</TableHead>
                      <TableHead className="font-semibold text-gray-700">Date Received</TableHead>
                      <TableHead className="font-semibold text-gray-700">Account Code</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMessages.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-16 relative">
                          <div className="flex flex-col items-center justify-center text-gray-500">
                            {/* Floating dots animation */}
                            <div className="relative w-24 h-24 mb-8">
                              {/* Large blue dot */}
                              <div className="absolute top-2 left-8 w-4 h-4 bg-[hsl(213,87%,42%)] rounded-full animate-bounce"></div>
                              {/* Medium blue dot */}
                              <div className="absolute top-8 left-12 w-3 h-3 bg-[hsl(213,87%,52%)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              {/* Small blue dot */}
                              <div className="absolute top-12 left-6 w-3 h-3 bg-[hsl(213,87%,52%)] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                              {/* Light blue dot */}
                              <div className="absolute top-16 left-10 w-2 h-2 bg-[hsl(213,87%,62%)] rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                            </div>
                            
                            {/* Folder icon */}
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                              <FileText className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-lg font-medium text-gray-400">No Data</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      mockMessages.map((message) => (
                        <TableRow key={message.id}>
                          <TableCell>{message.providerName}</TableCell>
                          <TableCell>{message.type}</TableCell>
                          <TableCell>{message.message}</TableCell>
                          <TableCell>{message.status}</TableCell>
                          <TableCell>{message.destinationAddress}</TableCell>
                          <TableCell>{message.sourceAddress}</TableCell>
                          <TableCell>{message.requestType}</TableCell>
                          <TableCell>{message.dateReceived}</TableCell>
                          <TableCell>{message.accountCode}</TableCell>
                        </TableRow>
                      ))
                    )}
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