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
import { Trash2, Plus } from "lucide-react";
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

interface SenderID {
  statusMsg: string;
  accountStatus: string;
  userName: string;
  senderId: string;
}

export default function SenderIds() {
  const [senderIDs, setSenderIDs] = useState<SenderID[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;
  const url = "http://172.27.34.87:8080/telonenfe/accounts/senderid";

  // Fetch sender IDs from the API
  useEffect(() => {
    const fetchSenderIDs = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: SenderID[] = await response.json();
        setSenderIDs(data);
      } catch (error) {
        console.error("Failed to fetch sender IDs:", error);
      }
    };
    fetchSenderIDs();
  }, []);

  // Clamp currentPage if senderIDs changes and page is out of range
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(senderIDs.length / entriesPerPage));
    if (currentPage > totalPages) setCurrentPage(totalPages);
    if (currentPage < 1) setCurrentPage(1);
  }, [senderIDs, currentPage]);

  const handleAddSenderID = () => {
    const newSenderID: SenderID = {
      statusMsg: "NEW SENDER",
      accountStatus: "ACTIVE",
      userName: "new_sender",
      senderId: `Sender_${senderIDs.length + 1}`,
    };
    setSenderIDs((prev) => [...prev, newSenderID]);
    setCurrentPage(1); // Always reset to first page after add
  };

  const handleDeleteSenderID = (id: string) => {
    setSenderIDs((prev) => prev.filter((sender) => sender.senderId !== id));
    // currentPage will be clamped by useEffect
  };

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(senderIDs.length / entriesPerPage));
  const paginatedSenderIDs = senderIDs.slice(
    (currentPage - 1) * entriesPerPage,
    (currentPage - 1) * entriesPerPage + entriesPerPage
  );

  return (
    <div>
      <Navbar />
      <SidebarLayout>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Sender IDs</h1>
            <div className="flex space-x-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Sender ID
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md w-full">
                  <DialogHeader>
                    <DialogTitle>Add Sender ID</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div>
                      <Label
                        htmlFor="idName"
                        className="font-semibold text-red-600"
                      >
                        * ID Name :
                      </Label>
                      <input
                        id="idName"
                        type="text"
                        className="w-full border rounded px-2 py-1 mt-1"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="userName"
                        className="font-semibold text-red-600"
                      >
                        * User Name :
                      </Label>
                      <select
                        id="userName"
                        className="w-full border rounded px-2 py-1 mt-1"
                      >
                        <option value="">Select Provider</option>
                        {/* Add options dynamically */}
                      </select>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <Button
                        type="button"
                        disabled
                        className="bg-gray-200 text-gray-500 cursor-not-allowed"
                      >
                        Save
                      </Button>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="text-blue-600 border-blue-600"
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Sender IDs Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">
                      Name
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">
                      User  Name
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedSenderIDs.map((sender) => (
                    <TableRow
                      key={sender.senderId}
                      className="border-b border-gray-100"
                    >
                      <TableCell className="py-6 px-6 font-medium">
                        {sender.senderId}
                      </TableCell>
                      <TableCell className="py-6 px-6">
                        <span className="text-gray-600">
                          {sender.accountStatus}
                        </span>
                      </TableCell>
                      <TableCell className="py-6 px-6 text-gray-600">
                        {sender.userName}
                      </TableCell>
                      <TableCell className="py-6 px-6">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteSenderID(sender.senderId)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* Pagination Controls */}
              <div className="flex justify-end items-center gap-2 p-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </div>
  );
}
