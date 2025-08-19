import { useState, useEffect } from "react";
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
import { Search, Download, Calendar, FileText } from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";
import Navbar from "@/components/Navbar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface SMSBatch {
  id: string;
  message: string;
  recipients: number;
  totalCost: number;
  senderAccount: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  createdAt: string;
}

interface CsvData {
  id: string;
  name: string;
  phoneNumber: string;
  balance: number;
}

export default function BulkSMS() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");
  const [batches, setBatches] = useState<SMSBatch[]>([]);
  const [csvData, setCsvData] = useState<CsvData[]>([]);
  const [senderId, setSenderId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [startTime, setStartTime] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = "http://172.27.6.208:8080";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [batchesRes, csvRes] = await Promise.all([
          //fetch(`${baseUrl}/api/sms/history`),
          fetch(`${baseUrl}/api/csv/data`)
        ]);

        if (!batchesRes.ok) throw new Error("Failed to fetch SMS batches");
        if (!csvRes.ok) throw new Error("Failed to fetch CSV data");

        const batchesData = await batchesRes.json();
        const csvData = await csvRes.json();

        setBatches(batchesData);
        setCsvData(csvData);
      } catch (err) {
        toast.error("Failed to load data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/csv/export`);
      if (!res.ok) throw new Error("Failed to export CSV");
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sms_export_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Export successful");
    } catch (err) {
      toast.error("Failed to export data");
      console.error(err);
    }
  };

  const handleSend = async () => {
    if (!senderId || !file || !startTime || !message) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("sender", senderId);
      formData.append("file", file);
      formData.append("executionTime", startTime);
      formData.append("message", message);

      const res = await fetch(`${baseUrl}/api/sms/schedule`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to schedule messages");
      }

      toast.success("Messages scheduled successfully!");
      setSenderId("");
      setFile(null);
      setStartTime("");
      setMessage("");
    } catch (err: any) {
      toast.error(err.message || "Failed to schedule messages");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = 
      batch.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.senderAccount.toLowerCase().includes(searchQuery.toLowerCase());
    
    return activeTab === "pending" 
      ? matchesSearch && batch.status === "PENDING"
      : matchesSearch && batch.status !== "PENDING";
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SidebarLayout>
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Bulk SMS Management
            </h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleExport}
                disabled={isLoading || csvData.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Messages
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Schedule Bulk Messages</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }} className="space-y-4">
                    <div>
                      <Label className="font-medium">
                        Sender ID <span className="text-red-500">*</span>
                      </Label>
                      <select
                        required
                        value={senderId}
                        onChange={(e) => setSenderId(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Sender</option>
                        <option value="SmartPark">Smart Park</option>
                        <option value="TelZone">TelZone</option>
                        <option value="System">System</option>
                      </select>
                    </div>

                    <div>
                      <Label className="font-medium">
                        CSV File <span className="text-red-500">*</span>
                      </Label>
                      <div className="mt-1">
                        <input
                          type="file"
                          required
                          accept=".csv,.xlsx"
                          onChange={(e) => setFile(e.target.files?.[0] || null)}
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        />
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Upload a CSV file with recipient data
                      </p>
                    </div>

                    <div>
                      <Label className="font-medium">
                        Schedule Time <span className="text-red-500">*</span>
                      </Label>
                      <input
                        type="datetime-local"
                        required
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <Label className="font-medium">
                        Message Template <span className="text-red-500">*</span>
                      </Label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Dear {name}, your balance is {balance}"
                      />
                      <div className="mt-1 text-sm text-gray-600">
                        <p>Characters: {message.length}</p>
                        <p>Messages: {Math.ceil(message.length / 160)}</p>
                        <p className="mt-1 text-blue-600">
                          Use {"{name}"} and {"{balance}"} for personalization
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <DialogClose asChild>
                        <Button type="button" variant="outline">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isLoading ? "Scheduling..." : "Schedule Messages"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search batches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "pending" | "completed")}>
            <TabsList className="grid grid-cols-2 w-full md:w-64 mb-6">
              <TabsTrigger value="pending" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Pending
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Completed
              </TabsTrigger>
            </TabsList>

            {/* Content */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <TabsContent value="pending">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Message</TableHead>
                            <TableHead>Recipients</TableHead>
                            <TableHead>Sender</TableHead>
                            <TableHead>Scheduled Time</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBatches.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="h-64 text-center">
                                <div className="flex flex-col items-center justify-center text-gray-500">
                                  <FileText className="h-10 w-10 mb-2" />
                                  <p>No pending messages</p>
                                </div>
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredBatches
                              .filter(b => b.status === "PENDING")
                              .map((batch) => (
                                <TableRow key={batch.id}>
                                  <TableCell className="max-w-xs truncate">
                                    {batch.message}
                                  </TableCell>
                                  <TableCell>{batch.recipients}</TableCell>
                                  <TableCell>{batch.senderAccount}</TableCell>
                                  <TableCell>
                                    {new Date(batch.createdAt).toLocaleString()}
                                  </TableCell>
                                  <TableCell>
                                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                      {batch.status}
                                    </span>
                                  </TableCell>
                                </TableRow>
                              ))
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="completed">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Message</TableHead>
                            <TableHead>Recipients</TableHead>
                            <TableHead>Sender</TableHead>
                            <TableHead>Completed Time</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBatches.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="h-64 text-center">
                                <div className="flex flex-col items-center justify-center text-gray-500">
                                  <FileText className="h-10 w-10 mb-2" />
                                  <p>No completed messages</p>
                                </div>
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredBatches
                              .filter(b => b.status !== "PENDING")
                              .map((batch) => (
                                <TableRow key={batch.id}>
                                  <TableCell className="max-w-xs truncate">
                                    {batch.message}
                                  </TableCell>
                                  <TableCell>{batch.recipients}</TableCell>
                                  <TableCell>{batch.senderAccount}</TableCell>
                                  <TableCell>
                                    {new Date(batch.createdAt).toLocaleString()}
                                  </TableCell>
                                  <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                      batch.status === "COMPLETED" 
                                        ? "bg-green-100 text-green-800" 
                                        : "bg-red-100 text-red-800"
                                    }`}>
                                      {batch.status}
                                    </span>
                                  </TableCell>
                                </TableRow>
                              ))
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </SidebarLayout>
    </div>
  );
}