import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Calendar,
  FileText,
  User,
  ChevronDown,
} from "lucide-react";

interface SMSBatch {
  id: string;
  message: string;
  recipients: number;
  totalMessage: number;
  totalCost: number;
  senderAccount: string;
  state: string;
  status: string;
}

const mockBatches: SMSBatch[] = [
  // Empty array to show "No Data" state
];

export default function BulkSMS() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  const navigationItems = [
    { icon: FileText, label: "Dashboard" },
    { icon: FileText, label: "Messages" },
    { icon: Calendar, label: "Scheduling Bulk SMS", active: true },
    { icon: User, label: "Sender Ids" },
    { icon: User, label: "Accounts Management" },
    { icon: FileText, label: "Providers" },
    { icon: FileText, label: "Reports" },
    { icon: FileText, label: "SMS Account Balances" },
    { icon: FileText, label: "Tariffs" },
    { icon: FileText, label: "Developer Portal" },
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
              <h1 className="text-2xl font-semibold text-gray-900">Bulk SMS Batches</h1>
              <div className="flex space-x-3">
                <Button className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Export to Excel
                </Button>
                <Button className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
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

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-fit grid-cols-2 mb-6">
                <TabsTrigger 
                  value="pending" 
                  className="data-[state=active]:bg-[hsl(213,87%,42%)] data-[state=active]:text-white"
                >
                  PENDING
                </TabsTrigger>
                <TabsTrigger 
                  value="completed"
                  className="data-[state=active]:bg-[hsl(213,87%,42%)] data-[state=active]:text-white"
                >
                  COMPLETED
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold text-gray-700">Message</TableHead>
                          <TableHead className="font-semibold text-gray-700">Recipients</TableHead>
                          <TableHead className="font-semibold text-gray-700">Total Message</TableHead>
                          <TableHead className="font-semibold text-gray-700">Total Cost</TableHead>
                          <TableHead className="font-semibold text-gray-700">Sender Account</TableHead>
                          <TableHead className="font-semibold text-gray-700">State</TableHead>
                          <TableHead className="font-semibold text-gray-700">Status</TableHead>
                          <TableHead className="font-semibold text-gray-700">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockBatches.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-12">
                              <div className="flex flex-col items-center justify-center text-gray-500">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                  <FileText className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-lg font-medium">No Data</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          mockBatches.map((batch) => (
                            <TableRow key={batch.id}>
                              <TableCell>{batch.message}</TableCell>
                              <TableCell>{batch.recipients}</TableCell>
                              <TableCell>{batch.totalMessage}</TableCell>
                              <TableCell>{batch.totalCost}</TableCell>
                              <TableCell>{batch.senderAccount}</TableCell>
                              <TableCell>{batch.state}</TableCell>
                              <TableCell>{batch.status}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold text-gray-700">Message</TableHead>
                          <TableHead className="font-semibold text-gray-700">Recipients</TableHead>
                          <TableHead className="font-semibold text-gray-700">Total Message</TableHead>
                          <TableHead className="font-semibold text-gray-700">Total Cost</TableHead>
                          <TableHead className="font-semibold text-gray-700">Sender Account</TableHead>
                          <TableHead className="font-semibold text-gray-700">State</TableHead>
                          <TableHead className="font-semibold text-gray-700">Status</TableHead>
                          <TableHead className="font-semibold text-gray-700">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-12">
                            <div className="flex flex-col items-center justify-center text-gray-500">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                <FileText className="w-8 h-8 text-gray-400" />
                              </div>
                              <p className="text-lg font-medium">No Data</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}