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
import SidebarLayout from "@/components/SidebarLayout";

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
    <SidebarLayout>
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
    </SidebarLayout>
  );
}