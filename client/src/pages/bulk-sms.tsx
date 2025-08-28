import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { Calendar, FileText, Search } from "lucide-react";
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
import Papa from "papaparse";

interface SMSBatch {
  id: string;
  recipients: number;
  totalCost: number;
  senderAccount: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  createdAt: string;
}

export default function BulkSMS() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");
  const [batches, setBatches] = useState<SMSBatch[]>([]);
  const [startTime, setStartTime] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [csvPreview, setCsvPreview] = useState<any[] | null>(null);
  const [csvHeaders, setCsvHeaders] = useState<string[] | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Fetch batch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/sms/history");
        if (!res.ok) throw new Error("Failed to fetch SMS batches");
        const data = await res.json();
        setBatches(data);
      } catch (err) {
        toast.error("Failed to load data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSend = async () => {
    if (!startTime || !file) {
      toast.error("Please select execution time and upload CSV file");
      return;
    }

    try {
      setIsLoading(true);

      // 1️⃣ Upload CSV
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/csv/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.message || "CSV upload failed");

      // 2️⃣ Send executionTime to schedule messages
      const smsRes = await fetch("/api/sms/sms/once", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ executionTime: startTime }),
      });

      const smsData = await smsRes.json();
      if (!smsRes.ok) throw new Error(smsData.message || "Failed to schedule messages");

      toast.success("CSV uploaded and messages scheduled successfully!");
      setStartTime("");
      setFile(null);
    } catch (err: any) {
      toast.error(err.message || "Operation failed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBatches = batches.filter(batch =>
    batch.senderAccount.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CSV file change handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: any) => {
          const data = results.data;
          const headers = results.meta.fields || (data.length > 0 ? Object.keys(data[0]) : []);
          setCsvHeaders(headers);
          setCsvPreview(data.slice(0, 5));
          setShowPreview(true);
        },
        error: () => {
          toast.error("Failed to parse CSV file");
        },
      });
    } else {
      setCsvPreview(null);
      setShowPreview(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SidebarLayout>
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">Bulk SMS Management</h1>
            <div className="flex flex-col sm:flex-row gap-3">
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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <Label className="font-medium">
                        Execution Time <span className="text-red-500">*</span>
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
                        CSV File <span className="text-red-500">*</span>
                      </Label>
                      <input
                        type="file"
                        required
                        accept=".csv,.xlsx"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                      />
                    </div>

                    {/* CSV Preview */}
                    {showPreview && csvPreview && (
                      <div className="mt-4">
                        <Label className="font-medium">CSV Preview</Label>
                        <div className="max-h-60 overflow-auto border rounded-md mt-2">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                {csvHeaders?.map((header) => (
                                  <th key={header} className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {csvPreview.slice(0, 5).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  {csvHeaders?.map((header) => (
                                    <td key={header} className="px-4 py-2 text-sm text-gray-700">
                                      {row[header]}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

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
                        {isLoading ? "Processing..." : "Schedule Messages"}
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
              <input
                type="text"
                placeholder="Search batches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "pending" | "completed")}
          >
            <TabsList className="grid grid-cols-2 w-full md:w-64 mb-6">
              <TabsTrigger value="pending" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Pending
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Completed
              </TabsTrigger>
            </TabsList>

            {/* Pending Table */}
            <TabsContent value="pending">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Recipients</TableHead>
                        <TableHead>Sender</TableHead>
                        <TableHead>Scheduled Time</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBatches.filter(b => b.status === "PENDING").length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-64 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-500">
                              <FileText className="h-10 w-10 mb-2" />
                              <p>No pending messages</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredBatches
                          .filter(b => b.status === "PENDING")
                          .map(batch => (
                            <TableRow key={batch.id}>
                              <TableCell>{batch.recipients}</TableCell>
                              <TableCell>{batch.senderAccount}</TableCell>
                              <TableCell>{new Date(batch.createdAt).toLocaleString()}</TableCell>
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

            {/* Completed Table */}
            <TabsContent value="completed">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Recipients</TableHead>
                        <TableHead>Sender</TableHead>
                        <TableHead>Completed Time</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBatches.filter(b => b.status !== "PENDING").length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-64 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-500">
                              <FileText className="h-10 w-10 mb-2" />
                              <p>No completed messages</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredBatches
                          .filter(b => b.status !== "PENDING")
                          .map(batch => (
                            <TableRow key={batch.id}>
                              <TableCell>{batch.recipients}</TableCell>
                              <TableCell>{batch.senderAccount}</TableCell>
                              <TableCell>{new Date(batch.createdAt).toLocaleString()}</TableCell>
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
          </Tabs>

          {/* CSV Preview Modal */}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>CSV Preview (First 5 Rows)</DialogTitle>
              </DialogHeader>
              {csvPreview && csvHeaders && (
                <div className="overflow-x-auto">
                  <table className="min-w-full border text-sm">
                    <thead>
                      <tr>
                        {csvHeaders.map((header) => (
                          <th key={header} className="border px-2 py-1 bg-gray-100">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {csvPreview.map((row, idx) => (
                        <tr key={idx}>
                          {csvHeaders.map((header) => (
                            <td key={header} className="border px-2 py-1">{row[header]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="flex justify-end pt-4">
                <Button onClick={() => setShowPreview(false)} type="button" variant="outline">
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarLayout>
    </div>
  );
}

