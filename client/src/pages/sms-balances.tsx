import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package } from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";
import Navbar from "@/components/Navbar"; 

export default function SMSBalances() {
  return (
    <div>
      <Navbar /> 
      <SidebarLayout>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">SMS Balances</h1>
          </div>

          {/* Data Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium text-gray-700 px-6 py-4">
                      Name
                    </TableHead>
                    <TableHead className="font-medium text-gray-700 px-6 py-4">
                      SMS Balances
                    </TableHead>
                    <TableHead className="font-medium text-gray-700 px-6 py-4">
                      State
                    </TableHead>
                    <TableHead className="font-medium text-gray-700 px-6 py-4">
                      Request Date
                    </TableHead>
                    <TableHead className="font-medium text-gray-700 px-6 py-4">
                      Reference
                    </TableHead>
                    <TableHead className="font-medium text-gray-700 px-6 py-4">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Empty state - no data */}
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-20">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-sm">No Data</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </div>
  );
}
