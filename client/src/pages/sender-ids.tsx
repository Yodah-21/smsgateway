"use client";

import { useEffect, useState, useMemo } from "react";
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

  const senderIdUrl = "http://172.27.34.87:8080/telonenfe/accounts/senderid";

  const providers = [
    "telonetestuser",
    "insureme",
    "rguveya",
    "teloneprod",
    "tgavhu",
    "TelZone",
    "SmartWifi",
    "test",
    "Opal2",
    "Kudakwashe.mtudza",
    "macdonald.gomo",
    "ISolutions",
    "SmartCity",
  ];

  // Fetch all sender IDs
  useEffect(() => {
    const fetchSenderIDs = async () => {
      try {
        const res = await fetch(senderIdUrl);
        if (!res.ok) throw new Error("Failed to fetch sender IDs");
        const data: SenderID[] = await res.json();
        setSenderIDs(data || []);
      } catch (err) {
        console.error(err);
        setSenderIDs([]);
      }
    };
    fetchSenderIDs();
  }, []);

  const totalPages = Math.ceil(senderIDs.length / entriesPerPage) || 1;

  // Clamp currentPage to valid range
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
    if (currentPage < 1) setCurrentPage(1);
  }, [totalPages, currentPage]);

  // Paginate sender IDs
  const paginatedSenderIDs = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return senderIDs.slice(start, start + entriesPerPage);
  }, [senderIDs, currentPage]);

  // Add sender ID
  const handleAddSenderID = async (userName: string, senderName: string) => {
    try {
      const apiUrl = `http://172.27.34.87:8080/telonenfe/accounts/registersenderid/${userName}`;
      const res = await fetch(apiUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderIdName: senderName }),
      });
      if (!res.ok) throw new Error("Failed to save sender ID");

      const refreshed = await (await fetch(senderIdUrl)).json();
      setSenderIDs(refreshed || []);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      alert("Failed to save sender ID. Please try again.");
    }
  };

  // Delete sender ID
  const handleDeleteSenderID = async (sender: SenderID) => {
    try {
      const apiUrl = `http://172.27.34.87:8080/telonenfe/accounts/senderid/${sender.senderId}`;
      await fetch(apiUrl, { method: "DELETE" });

      const updated = senderIDs.filter((s) => s.senderId !== sender.senderId);
      setSenderIDs(updated);
    } catch (err) {
      console.error(err);
      alert("Failed to delete sender ID.");
    }
  };

  return (
    <div>
      <Navbar />
      <SidebarLayout>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Sender IDs</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Sender ID
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md w-full">
                <DialogHeader>
                  <DialogTitle>Add Sender ID</DialogTitle>
                </DialogHeader>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as any;
                    const senderName = form.senderName.value;
                    const userName = form.userName.value;
                    if (senderName && userName) {
                      handleAddSenderID(userName, senderName);
                      form.reset();
                    }
                  }}
                >
                  <div>
                    <Label htmlFor="senderName" className="font-semibold text-black">
                      * ID Name:
                    </Label>
                    <input
                      id="senderName"
                      name="senderName"
                      type="text"
                      className="w-full border rounded px-2 py-1 mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="userName" className="font-semibold text-black">
                      * Provider:
                    </Label>
                    <select
                      id="userName"
                      name="userName"
                      className="w-full border rounded px-2 py-1 mt-1"
                      required
                    >
                      <option value="">Select Provider</option>
                      {providers.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    <Button type="submit" className="bg-blue-600 text-white">
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

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Name</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Provider</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedSenderIDs.length > 0 ? (
                    paginatedSenderIDs.map((sender) => (
                      <TableRow
                        key={`${sender.userName}-${sender.senderId}`}
                        className="border-b border-gray-100"
                      >
                        <TableCell className="py-6 px-6 font-medium">{sender.senderId}</TableCell>
                        <TableCell className="py-6 px-6">{sender.accountStatus}</TableCell>
                        <TableCell className="py-6 px-6 text-gray-600">{sender.userName}</TableCell>
                        <TableCell className="py-6 px-6">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteSenderID(sender)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                        No sender IDs found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Pagination with clickable numbers */}
              <div className="flex justify-end items-center gap-2 p-4 flex-wrap">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    size="sm"
                    variant={page === currentPage ? "default" : "outline"}
                    className={page === currentPage ? "bg-blue-600 text-white" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}

                {/* Next Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
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
