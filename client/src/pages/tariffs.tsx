import { useEffect, useState } from "react";
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
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";
import Navbar from "@/components/Navbar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface TariffData {
  zwlSms: string;
  usdAmountPerSMS: string;
  status: string;
  lastUpdate: string;
}

export default function Tariffs() {
  const [tariff, setTariff] = useState<TariffData | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const url = "http://172.27.34.87:8080/telonenfe/account/get-current-tarrif";

  useEffect(() => {
    const fetchTariff = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch tariff data");
        }

        const json = await response.json();

        // Extract from message field
        const data = json.message;

        const formatted: TariffData = {
          zwlSms: data.zwlSms,
          usdAmountPerSMS: data.usdSms,
          status: data.status,
          lastUpdate: new Date(Number(data.lastUpdate)).toLocaleString(),
        };

        setTariff(formatted);
      } catch (error) {
        console.error("Error fetching tariff:", error);
      }
    };

    fetchTariff();
  }, []);

  return (
    <div>
      <Navbar />
      <SidebarLayout>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Tariffs</h1>
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white" onClick={() => setEditOpen(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Tariff
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md w-full">
                <DialogHeader>
                  <DialogTitle>Update Tariff</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="zwlPrice" className="font-semibold text-red-600">* ZWL Price</Label>
                    <input id="zwlPrice" type="text" defaultValue={tariff?.zwlSms || ''} className="w-full border rounded px-2 py-1 mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="usdPrice" className="font-semibold text-red-600">* USD Price</Label>
                    <input id="usdPrice" type="text" defaultValue={tariff?.usdAmountPerSMS || ''} className="w-full border rounded px-2 py-1 mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="status" className="font-semibold text-red-600">* status</Label>
                    <select id="status" className="w-full border rounded px-2 py-1 mt-1" defaultValue={tariff?.status || ''}>
                      <option value="">Select</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    <Button type="button" className="bg-blue-600 text-white">Save</Button>
                    <DialogClose asChild>
                      <Button type="button" variant="outline" className="text-blue-600 border-blue-600">Cancel</Button>
                    </DialogClose>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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
                  {tariff ? (
                    <TableRow className="border-b border-gray-100">
                      <TableCell className="px-6 py-4 text-gray-900">{tariff.zwlSms}</TableCell>
                      <TableCell className="px-6 py-4 text-gray-900">{tariff.usdAmountPerSMS}</TableCell>
                      <TableCell className="px-6 py-4 text-gray-600">{tariff.status}</TableCell>
                      <TableCell className="px-6 py-4 text-gray-900">{tariff.lastUpdate}</TableCell>
                      <TableCell className="px-6 py-4">
                        <Button size="sm" className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                        Loading tariff...
                      </TableCell>
                    </TableRow>
                  )}
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
      </SidebarLayout>
    </div>
  );
}
