import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";
import Navbar from "@/components/Navbar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Provider {
  id: string;
  name: string;
  status: boolean;
  countryCode: string;
}

export default function Providers() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  const url = "http://172.27.34.87:8080/telonenfe/providers";

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch providers");
        }
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const handleToggleStatus = (id: string) => {
    setProviders(prev =>
      prev.map(provider =>
        provider.id === id
          ? { ...provider, status: !provider.status }
          : provider
      )
    );
  };

  return (
    <div>
      <Navbar />
      <SidebarLayout>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Providers</h1>
            <div className="flex space-x-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Provider
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add Provider</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="font-semibold text-red-600">* Name</Label>
                      <input id="name" type="text" placeholder="Enter  name" className="w-full border rounded px-2 py-1 mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="countryCode" className="font-semibold text-red-600">* Country Code</Label>
                      <input id="countryCode" type="text" placeholder="Enter  countryCode" className="w-full border rounded px-2 py-1 mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="priority" className="font-semibold text-red-600">* Priority</Label>
                      <input id="priority" type="text" placeholder="Enter  priority" className="w-full border rounded px-2 py-1 mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="dispatcher" className="font-semibold text-red-600">* Notification Dispatcher</Label>
                      <select id="dispatcher" className="w-full border rounded px-2 py-1 mt-1">
                        <option value="">Select</option>
                        {/* Add options dynamically */}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="supportsEmail" className="font-semibold text-red-600">* Supports Email</Label>
                      <select id="supportsEmail" className="w-full border rounded px-2 py-1 mt-1">
                        <option value="">Select</option>
                        {/* Add options dynamically */}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="supportsSMS" className="font-semibold text-red-600">* Support SMS</Label>
                      <select id="supportsSMS" className="w-full border rounded px-2 py-1 mt-1">
                        <option value="">Select</option>
                        {/* Add options dynamically */}
                      </select>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <Button type="button" disabled className="bg-gray-200 text-gray-500 cursor-not-allowed">Save</Button>
                      <DialogClose asChild>
                        <Button type="button" variant="outline" className="text-blue-600 border-blue-600">Cancel</Button>
                      </DialogClose>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Providers Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Name</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Country Code</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Active/Deactive</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                        Loading providers...
                      </TableCell>
                    </TableRow>
                  ) : providers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                        No providers found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    providers.map((provider) => (
                      <TableRow key={provider.id} className="border-b border-gray-100">
                        <TableCell className="py-6 px-6 font-medium">{provider.name}</TableCell>
                        <TableCell className="py-6 px-6">
                          <span className="text-gray-600">{provider.status ? 'Active' : 'Inactive'}</span>
                        </TableCell>
                        <TableCell className="py-6 px-6 text-gray-600">{provider.countryCode}</TableCell>
                        <TableCell className="py-6 px-6">
                          <Switch
                            checked={!!provider.status}
                            onCheckedChange={() => handleToggleStatus(provider.id)}
                            className="data-[state=checked]:bg-[hsl(213,87%,42%)]"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            <Button variant="outline" size="sm" className="flex items-center">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-[hsl(213,87%,42%)] text-white border-[hsl(213,87%,42%]">
              1
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
}
