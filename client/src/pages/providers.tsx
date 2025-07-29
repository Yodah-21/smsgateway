import { useState } from "react";
import { Link } from "wouter";
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
  Menu,
  User,
  ChevronDown,
  MessageSquare,
  Clock,
  CreditCard,
  Users,
  Building,
  FileText,
  Wallet,
  DollarSign,
  Settings,
  BarChart3,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";

interface Provider {
  id: string;
  name: string;
  status: boolean;
  countryCode: string;
}

const mockProviders: Provider[] = [
  {
    id: "1",
    name: "NETONE",
    status: true,
    countryCode: "263",
  },
  {
    id: "2",
    name: "INNOVATION",
    status: true,
    countryCode: "263",
  },
  {
    id: "3",
    name: "SAGE 5G",
    status: false,
    countryCode: "263",
  },
];

export default function Providers() {
  const [providers, setProviders] = useState(mockProviders);

  const navigationItems = [
    { icon: BarChart3, label: "Dashboard" },
    { icon: MessageSquare, label: "Messages" },
    { icon: Clock, label: "Scheduling Bulk SMS" },
    { icon: CreditCard, label: "Sender Ids" },
    { icon: Users, label: "Accounts Management" },
    { icon: Building, label: "Providers", active: true },
    { icon: FileText, label: "Reports" },
    { icon: Wallet, label: "SMS Account Balances" },
    { icon: DollarSign, label: "Tariffs" },
    { icon: Settings, label: "Developer Portal" },
  ];

  return (
    <SidebarLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Providers</h1>
          <div className="flex space-x-3">
            <Button className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Provider
            </Button>
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
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providers.map((provider) => (
                  <TableRow key={provider.id} className="border-b border-gray-100">
                    <TableCell className="py-6 px-6 font-medium">{provider.name}</TableCell>
                    <TableCell className="py-6 px-6">
                      <span className="text-gray-600">{provider.status ? 'true' : 'false'}</span>
                    </TableCell>
                    <TableCell className="py-6 px-6 text-gray-600">{provider.countryCode}</TableCell>
                    <TableCell className="py-6 px-6">
                      <Switch
                        checked={provider.status}
                        onCheckedChange={() => setProviders(prev => prev.map(p => p.id === provider.id ? { ...p, status: !p.status } : p))}
                        className="data-[state=checked]:bg-[hsl(213,87%,42%)]"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          <Button variant="outline" size="sm" className="flex items-center">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-[hsl(213,87%,42%)] text-white border-[hsl(213,87%,42%)]">
            1
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </SidebarLayout>
  );
}