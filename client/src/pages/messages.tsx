import { useState } from "react";
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
  Search,
  Download,
  Send,
  FileText,
} from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";
import Navbar from "@/components/Navbar"; 
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

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
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Navbar /> 
      <SidebarLayout>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
            <div className="flex space-x-3">
              <Button className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white">
                <Download className="w-4 h-4 mr-2" />
                Export to Excel
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md w-full">
                  <DialogHeader>
                    <DialogTitle>Send Message</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="senderId" className="font-semibold text-red-600">* Sender ID :</Label>
                      <select id="senderId" className="w-full border rounded px-2 py-1 mt-1">
                        <option value="">Select</option>
                        {/* Add options dynamically */}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="destination" className="font-semibold text-red-600">* Destination :</Label>
                      <input id="destination" type="text" className="w-full border rounded px-2 py-1 mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="message" className="font-semibold text-red-600">* Message :</Label>
                      <textarea id="message" rows={4} className="w-full border rounded px-2 py-1 mt-1" />
                      <div className="text-xs mt-1">
                        <span className="font-semibold">Characters:</span> 0<br />
                        <span className="font-semibold">Message Number:</span> 1
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <Button type="button" disabled className="bg-gray-200 text-gray-500 cursor-not-allowed">Send</Button>
                      <DialogClose asChild>
                        <Button type="button" variant="outline" className="text-blue-600 border-blue-600">Cancel</Button>
                      </DialogClose>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
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
      </SidebarLayout>
    </div>
  );
}
