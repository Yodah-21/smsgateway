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
import { Trash2, Plus } from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";
import Navbar from "@/components/Navbar"; 

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
  return (
    <div>
      <Navbar /> 
      <SidebarLayout>
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
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">User  Name</TableHead>
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
      </SidebarLayout>
    </div>
  );
}
