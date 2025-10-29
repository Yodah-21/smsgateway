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
import { Edit, ChevronLeft, ChevronRight } from "lucide-react";
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

interface TariffData {
  zwlAmountPerSMS: string;
  usdAmountPerSMS: string;
  tarriffStatus: string;
  username: string;
  lastUpdateDate: string;
}

export default function Tariffs() {
  const [tariff, setTariff] = useState<TariffData | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    zwlAmountPerSMS: "",
    usdAmountPerSMS: "",
    tarriffStatus: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const GET_URL = "http://172.27.34.87:8080/telonenfe/account/get-current-tarrif";
  const PUT_URL = "http://172.27.34.87:8080/telonenfe/account/update-tarriff-information";

  // Fetch tariff data
  useEffect(() => {
    const fetchTariff = async () => {
      try {
        const response = await fetch(GET_URL, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch tariff data");

        const json = await response.json();
        const data = json.message || json;

        const formatted: TariffData = {
          zwlAmountPerSMS: data.zwlAmountPerSMS,
          usdAmountPerSMS: data.usdAmountPerSMS,
          tarriffStatus: data.tarriffStatus,
          username: data.username,
          lastUpdateDate: new Date(data.lastUpdateDate).toLocaleString(),
        };

        setTariff(formatted);
      } catch (err) {
        console.error("Error fetching tariff:", err);
        setError("Failed to fetch tariff data.");
      }
    };

    fetchTariff();
  }, []);

  // Open modal and prefill fields
  const handleEditClick = () => {
    if (!tariff) return;
    setFormData({
      zwlAmountPerSMS: tariff.zwlAmountPerSMS,
      usdAmountPerSMS: tariff.usdAmountPerSMS,
      tarriffStatus: "", // status starts empty
    });
    setError("");
    setEditOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Save updated tariff
  const handleSave = async () => {
    if (!formData.zwlAmountPerSMS || !formData.usdAmountPerSMS || !formData.tarriffStatus) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const payload = {
        zwlAmountPerSMS: formData.zwlAmountPerSMS,
        usdAmountPerSMS: formData.usdAmountPerSMS,
        tarriffStatus: formData.tarriffStatus,
        username: tariff?.username,
        lastUpdateDate: new Date().toISOString(),
      };

      const response = await fetch(PUT_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Failed to update tariff: ${response.status}`);

      const updatedData = await response.json();
      const data = updatedData.message || updatedData;

      setTariff({
        zwlAmountPerSMS: data.zwlAmountPerSMS,
        usdAmountPerSMS: data.usdAmountPerSMS,
        tarriffStatus: data.tarriffStatus,
        username: data.username,
        lastUpdateDate: new Date(data.lastUpdateDate).toLocaleString(),
      });

      setEditOpen(false);
    } catch (err) {
      console.error("Error updating tariff:", err);
      setError("Failed to update tariff. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

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
                <Button
                  className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white"
                  onClick={handleEditClick}
                >
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
                    <Label htmlFor="zwlAmountPerSMS" className="font-semibold text-red-600">
                      * ZWL Price
                    </Label>
                    <input
                      id="zwlAmountPerSMS"
                      type="text"
                      value={formData.zwlAmountPerSMS}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="usdAmountPerSMS" className="font-semibold text-red-600">
                      * USD Price
                    </Label>
                    <input
                      id="usdAmountPerSMS"
                      type="text"
                      value={formData.usdAmountPerSMS}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tarriffStatus" className="font-semibold text-red-600">
                      * Status
                    </Label>
                    <select
                      id="tarriffStatus"
                      value={formData.tarriffStatus}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 mt-1"
                    >
                      <option value="">Select</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {error && <p className="text-red-600 text-sm">{error}</p>}

                  <div className="flex items-center space-x-4 mt-4">
                    <Button
                      type="button"
                      className="bg-blue-600 text-white"
                      onClick={handleSave}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
                    </Button>
                    <DialogClose asChild>
                      <Button type="button" variant="outline" className="text-blue-600 border-blue-600">
                        Cancel
                      </Button>
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
                    <TableHead className="font-medium text-gray-700 px-6 py-4">Username</TableHead>
                    <TableHead className="font-medium text-gray-700 px-6 py-4">Last Update</TableHead>
                    <TableHead className="font-medium text-gray-700 px-6 py-4">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tariff ? (
                    <TableRow className="border-b border-gray-100">
                      <TableCell className="px-6 py-4 text-gray-900">{tariff.zwlAmountPerSMS}</TableCell>
                      <TableCell className="px-6 py-4 text-gray-900">{tariff.usdAmountPerSMS}</TableCell>
                      <TableCell className="px-6 py-4 text-gray-600">{tariff.tarriffStatus}</TableCell>
                      <TableCell className="px-6 py-4 text-gray-600">{tariff.username}</TableCell>
                      <TableCell className="px-6 py-4 text-gray-900">{tariff.lastUpdateDate}</TableCell>
                      <TableCell className="px-6 py-4">
                        <Button
                          size="sm"
                          className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white"
                          onClick={handleEditClick}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-gray-500">
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
