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

interface SenderID {
  statusMsg: string;
  accountStatus: string;
  userName: string;
  senderId: string;
}

export default function SenderIds() {
  const [senderIDs, setSenderIDs] = useState<SenderID[]>([]);
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

  const handleAddSenderID = () => {
    const newSenderID: SenderID = {
      statusMsg: "NEW SENDER",
      accountStatus: "ACTIVE",
      userName: "new_sender",
      senderId: `Sender_${senderIDs.length + 1}`,
    };
    setSenderIDs([...senderIDs, newSenderID]);
  };

  const handleDeleteSenderID = (id: string) => {
    setSenderIDs(senderIDs.filter(sender => sender.senderId !== id));
  };

  return (
    <div>
      <Navbar />
      <SidebarLayout>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Sender IDs</h1>
            <div className="flex space-x-3">
              <Button
                className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white"
                onClick={handleAddSenderID}
              >
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
                  {senderIDs.map((sender) => (
                    <TableRow key={sender.senderId} className="border-b border-gray-100">
                      <TableCell className="py-6 px-6 font-medium">{sender.senderId}</TableCell> {/* Show senderId in Name column */}
                      <TableCell className="py-6 px-6">
                        <span className="text-gray-600">{sender.accountStatus}</span>
                      </TableCell>
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
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </div>
  );
}
