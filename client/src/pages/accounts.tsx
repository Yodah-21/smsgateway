import { useState } from "react";
import { Link } from "wouter";
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
import {
  Plus,
} from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";
import Navbar from "@/components/Navbar"; 

interface Account {
  id: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  accountName: string;
  email: string;
  smsBalance: number;
  status: string;
}

const mockAccounts: Account[] = [
  // ... (your mock accounts data)
];

export default function Accounts() {
  return (
    <div>
      <Navbar /> 
      <SidebarLayout>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Accounts</h1>
            <div className="flex space-x-3">
              <Button className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Account
              </Button>
            </div>
          </div>

          {/* Accounts Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Name</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Last Name</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Phone Number</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Account name</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Email</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">SMS Balance</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAccounts.map((account) => (
                    <TableRow key={account.id} className="border-b border-gray-100">
                      <TableCell className="py-6 px-6 font-medium">{account.name}</TableCell>
                      <TableCell className="py-6 px-6 text-gray-600">{account.lastName}</TableCell>
                      <TableCell className="py-6 px-6 text-gray-600">{account.phoneNumber}</TableCell>
                      <TableCell className="py-6 px-6 text-gray-600">{account.accountName}</TableCell>
                      <TableCell className="py-6 px-6 text-gray-600">{account.email}</TableCell>
                      <TableCell className="py-6 px-6 text-gray-600">{account.smsBalance.toLocaleString()}</TableCell>
                      <TableCell className="py-6 px-6">
                        <span className="text-gray-600">{account.status}</span>
                      </TableCell>
                      <TableCell className="py-6 px-6">
                        {account.status === "ACTIVE" ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-blue-200 text-blue-600 hover:bg-blue-50"
                          >
                            Suspend
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-green-200 text-green-600 hover:bg-green-50"
                          >
                            Activate
                          </Button>
                        )}
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
