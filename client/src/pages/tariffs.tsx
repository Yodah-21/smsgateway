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
  return (
    <SidebarLayout>
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
    </SidebarLayout>
  );
}