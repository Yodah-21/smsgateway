"use client";

import { useState, useEffect } from "react";
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
import { Search, Download, Send, FileText } from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";
import Navbar from "@/components/Navbar"; 
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Send Message form states
  const [senderId, setSenderId] = useState("");
  const [destination, setDestination] = useState("");
  const [messageText, setMessageText] = useState("");

  const messageLength = messageText.length;
  const messageNumber = Math.ceil(messageLength / 160) || 1;

  // Fetch messages from endpoint on mount
  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(""); //isa endpoint panapa
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data: Message[] = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    fetchMessages();
  }, []);

  // Filter messages based on search query
  const filteredMessages = messages.filter((msg) =>
    Object.values(msg).some((val) =>
      val.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Export filtered messages to Excel
  const handleExport = () => {
    if (filteredMessages.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(filteredMessages);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Messages");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "messages.xlsx");
  };

  // Handle sending a message (adds to table)
  const handleSendMessage = () => {
    if (!senderId || !destination || !messageText) return;

    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      providerName: senderId,
      type: "SMS",
      message: messageText,
      status: "Sent",
      destinationAddress: destination,
      sourceAddress: "Service",
      requestType: "Manual",
      dateReceived: new Date().toISOString().split("T")[0],
      accountCode: `AC${100 + messages.length + 1}`,
    };

    setMessages([newMessage, ...messages]);

    // Reset form
    setSenderId("");
    setDestination("");
    setMessageText("");
  };

  return (
    <div>
      <Navbar /> 
      <SidebarLayout>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
            <div className="flex space-x-3">
              <Button
                className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white"
                onClick={handleExport}
              >
                <Download className="w-4 h-4 mr-2" />
                Export to Excel
              </Button>

              {/* Send Message Dialog */}
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
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <Label htmlFor="senderId" className="font-semibold text-red-600">* Sender ID :</Label>
                      <select
                        id="senderId"
                        className="w-full border rounded px-2 py-1 mt-1"
                        value={senderId}
                        onChange={(e) => setSenderId(e.target.value)}
                      >
                        <option value="">Select</option>
                        {/* Replace with dynamic provider IDs if needed */}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="destination" className="font-semibold text-red-600">* Destination :</Label>
                      <input
                        id="destination"
                        type="text"
                        className="w-full border rounded px-2 py-1 mt-1"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="font-semibold text-red-600">* Message :</Label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full border rounded px-2 py-1 mt-1"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                      />
                      <div className="text-xs mt-1">
                        <span className="font-semibold">Characters:</span> {messageLength}<br />
                        <span className="font-semibold">Message Number:</span> {messageNumber}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-4">
                      <Button
                        type="button"
                        disabled={!senderId || !destination || !messageText}
                        className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-500"
                        onClick={handleSendMessage}
                      >
                        Send
                      </Button>
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
                  {filteredMessages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-16 relative">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <div className="relative w-24 h-24 mb-8">
                            <div className="absolute top-2 left-8 w-4 h-4 bg-[hsl(213,87%,42%)] rounded-full animate-bounce"></div>
                            <div className="absolute top-8 left-12 w-3 h-3 bg-[hsl(213,87%,52%)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="absolute top-12 left-6 w-3 h-3 bg-[hsl(213,87%,52%)] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            <div className="absolute top-16 left-10 w-2 h-2 bg-[hsl(213,87%,62%)] rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                          </div>
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                            <FileText className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-lg font-medium text-gray-400">No Data</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMessages.map((message) => (
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
