"use client";

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

  const senderIdUrl = "http://172.27.34.87:8080/telonenfe/accounts/senderid";

  // Hardcoded list of providers
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

  // Fetch sender IDs from API
  useEffect(() => {
    const fetchSenderIDs = async () => {
      try {
        const res = await fetch(senderIdUrl);
        if (!res.ok) throw new Error("Failed to fetch sender IDs");
        const data: SenderID[] = await res.json();
        setSenderIDs(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSenderIDs();
  }, []);

  // Add sender ID both locally and via API
  const handleAddSenderID = async (userName: string, senderName: string) => {
    try {
      // Use dynamic provider in the endpoint
      const apiUrl = `http://172.27.34.87:8080/telonenfe/accounts/registersenderid/${userName}`;

      const res = await fetch(apiUrl, {
        method: "PUT", // or PUT depending on backend
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderIdName: senderName }), // Correct field name
      });

      if (!res.ok) throw new Error("Failed to save sender ID");

      // Add to local state after successful API save
      const newSenderID: SenderID = {
        statusMsg: "NEW SENDER",
        accountStatus: "ACTIVE",
        userName,
        senderId: senderName,
      };
      setSenderIDs((prev) => [...prev, newSenderID]);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      alert("Failed to save sender ID. Please try again.");
    }
  };

  const handleDeleteSenderID = (id: string) => {
    setSenderIDs((prev) => prev.filter((sender) => sender.senderId !== id));
  };

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
                      Provider
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedSenderIDs.map((sender) => (
                    <TableRow key={sender.senderId} className="border-b border-gray-100">
                      <TableCell className="py-6 px-6 font-medium">{sender.senderId}</TableCell>
                      <TableCell className="py-6 px-6">{sender.accountStatus}</TableCell>
                      <TableCell className="py-6 px-6 text-gray-600">{sender.userName}</TableCell>
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
                  Page {currentPage} of {totalPages}
                </span>
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
