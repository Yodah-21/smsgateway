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
import { Plus, ChevronLeft, ChevronRight, Edit, User } from 'lucide-react';
import SidebarLayout from "@/components/SidebarLayout";
import Navbar from "@/components/Navbar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Account {
  id: number;
  userName: string;
  password: string;
  accountName: string;
  accountCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  accountStatus: string;
  smsUnits: number;
  senderId: string;
  role: string;
}

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const itemsPerPage = 5;
  const url = "http://172.27.34.87:8080/telonenfe/accounts";

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch accounts");
        const data: Account[] = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccounts();
  }, []);

  // Pagination logic
  const totalItems = accounts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAccounts = accounts.slice(startIndex, endIndex);

  const goToPage = (page: number) => setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  const goToPrevious = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const goToNext = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

  // Add Account API
  const handleAddAccount = async (formData: any, closeDialog: () => void) => {
    try {
      const duplicateUserName = accounts.find(acc => acc.userName === formData.userName);
      const duplicateAccountName = accounts.find(acc => acc.accountName === formData.accountName);
      if (duplicateUserName) {
        alert("This userName already exists!");
        return;
      }
      if (duplicateAccountName) {
        alert("This accountName already exists!");
        return;
      }

      const payload = {
        id: 0,
        userName: formData.userName,
        password: formData.password,
        accountName: formData.accountName,
        accountCode: formData.accountCode,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        accountStatus: "ACTIVE",
        smsUnits: Number(formData.smsUnits),
        senderId: formData.senderId,
        role: formData.role,
      };

      const res = await fetch("http://172.27.34.87:8080/telonenfe/account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text(); 
        alert(text || `Failed to save account. Status: ${res.status}`);
        return;
      }

      const savedAccount: Account = await res.json();
      setAccounts(prev => [...prev, savedAccount]); 
      closeDialog();

      const newTotalItems = accounts.length + 1;
      const newTotalPages = Math.ceil(newTotalItems / itemsPerPage);
      setCurrentPage(newTotalPages);

    } catch (err) {
      console.error(err);
      alert("Failed to save account. Please try again.");
    }
  };

  // Edit Account API
  const handleEditAccount = async (formData: any, closeDialog: () => void) => {
    if (!selectedAccount) return;

    try {
      const payload = {
        ...selectedAccount,
        ...formData,
        smsUnits: Number(formData.smsUnits),
      };

      const res = await fetch(`http://172.27.34.87:8080/telonenfe/account/${selectedAccount.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        alert(text || `Failed to update account. Status: ${res.status}`);
        return;
      }

      const updatedAccount: Account = await res.json();
      setAccounts(prev => prev.map(acc => acc.id === updatedAccount.id ? updatedAccount : acc));
      closeDialog();
      setSelectedAccount(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update account. Please try again.");
    }
  };

  // Toggle Activate / Suspend
  const toggleAccountStatus = async (account: Account) => {
    const isActive = account.accountStatus === "ACTIVE";
    const endpoint = isActive
      ? `http://172.27.34.87:8080/telonenfe/accounts/deactivate/${account.accountCode}`
      : `http://172.27.34.87:8080/telonenfe/accounts/activate/${account.accountCode}`;

    try {
      const res = await fetch(endpoint, { method: "PUT" });
      if (!res.ok) {
        const text = await res.text();
        alert(text || `Failed to ${isActive ? "suspend" : "activate"} account`);
        return;
      }
      setAccounts(prev =>
        prev.map(acc =>
          acc.accountCode === account.accountCode
            ? { ...acc, accountStatus: isActive ? "SUSPENDED" : "ACTIVE" }
            : acc
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update account status. Try again.");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <SidebarLayout>
        <div className="w-full px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Accounts</h1>
            {/* Add Account Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Account
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl w-full">
                <DialogHeader>
                  <DialogTitle>Add Account</DialogTitle>
                </DialogHeader>
                <form
                  className="grid grid-cols-2 gap-x-8 gap-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as any;
                    const data = {
                      firstName: form.firstName.value,
                      lastName: form.lastName.value,
                      userName: form.userName.value,
                      smsUnits: form.smsAmount.value,
                      role: form.role.value,
                      accountCode: form.accountCode.value,
                      accountName: form.accountName.value,
                      email: form.email.value,
                      phoneNumber: form.phoneNumber.value,
                      senderId: form.senderId.value,
                      password: form.password.value,
                    };
                    await handleAddAccount(data, () => form.reset());
                  }}
                >
                  <div>
                    <Label htmlFor="firstName">* First Name</Label>
                    <Input id="firstName" placeholder="Enter firstname" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">* Last Name</Label>
                    <Input id="lastName" placeholder="Enter lastname" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="userName">* User Name</Label>
                    <Input id="userName" placeholder="Enter userName" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="smsAmount">* SMS Amount</Label>
                    <Input id="smsAmount" placeholder="Enter amount" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="role">* Role</Label>
                    <Select>
                      <SelectTrigger id="role" className="mt-1">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="accountCode">* Account Code</Label>
                    <Input id="accountCode" placeholder="Enter Account Code" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="accountName">* Account Name</Label>
                    <Input id="accountName" placeholder="Account Name" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="email">* Email</Label>
                    <Input id="email" placeholder="Enter email" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">* Phone Number</Label>
                    <Input id="phoneNumber" placeholder="Enter phone number" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="senderId">* Sender ID</Label>
                    <Input id="senderId" placeholder="Enter senderId" className="mt-1" required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="password">* Password</Label>
                    <Input id="password" type="password" placeholder="Enter password" className="mt-1" required />
                  </div>
                  <div className="col-span-2 flex items-center space-x-4 mt-2">
                    <Button type="submit" className="bg-blue-600 text-white">Save</Button>
                    <DialogClose asChild>
                      <Button type="button" variant="outline" className="text-blue-600 border-blue-600">Cancel</Button>
                    </DialogClose>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Accounts Table */}
          <Card className="w-full bg-white shadow">
            <CardContent className="p-0">
              <Table className="table-auto w-full">
                <TableHeader>
                  <TableRow className="bg-gray-100 text-gray-700 text-sm">
                    <TableHead className="px-3 py-3 text-left">First Name</TableHead>
                    <TableHead className="px-3 py-3 text-left">Last Name</TableHead>
                    <TableHead className="px-3 py-3 text-left">Phone Number</TableHead>
                    <TableHead className="px-3 py-3 text-left">Account Name</TableHead>
                    <TableHead className="px-3 py-3 text-left">Email</TableHead>
                    <TableHead className="px-3 py-3 text-left">SMS Balance</TableHead>
                    <TableHead className="px-3 py-3 text-left">Status</TableHead>
                    <TableHead className="px-3 py-3 text-left">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAccounts.map((account) => (
                    <TableRow key={account.id} className="border-b text-sm">
                      <TableCell className="px-3 py-4 font-medium">{account.firstName}</TableCell>
                      <TableCell className="px-3 py-4">{account.lastName}</TableCell>
                      <TableCell className="px-3 py-4">{account.phoneNumber}</TableCell>
                      <TableCell className="px-3 py-4">{account.accountName}</TableCell>
                      <TableCell className="px-3 py-4 break-all">{account.email}</TableCell>
                      <TableCell className="px-3 py-4">
                        {account.smsUnits != null ? account.smsUnits.toLocaleString() : "N/A"}
                      </TableCell>
                      <TableCell className="px-3 py-4">{account.accountStatus}</TableCell>
                      <TableCell className="px-3 py-4 flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${
                            account.accountStatus === "ACTIVE"
                              ? "border-blue-200 text-blue-600 hover:bg-blue-50"
                              : "border-green-200 text-green-600 hover:bg-green-50"
                          }`}
                          onClick={() => toggleAccountStatus(account)}
                        >
                          {account.accountStatus === "ACTIVE" ? "Suspend" : "Activate"}
                        </Button>

                        {/* Edit Account Icon */}
                        <Dialog open={isEditModalOpen && selectedAccount?.id === account.id} onOpenChange={setIsEditModalOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="p-2 border-gray-200 text-gray-600 hover:bg-gray-100"
                              onClick={() => setSelectedAccount(account) || setIsEditModalOpen(true)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl w-full">
                            <DialogHeader>
                              <DialogTitle>Edit Account</DialogTitle>
                            </DialogHeader>
                            {selectedAccount && (
                              <form
                                className="grid grid-cols-2 gap-x-8 gap-y-4"
                                onSubmit={async (e) => {
                                  e.preventDefault();
                                  const form = e.target as any;
                                  const data = {
                                    firstName: form.firstName.value,
                                    lastName: form.lastName.value,
                                    userName: form.userName.value,
                                    smsUnits: form.smsAmount.value,
                                    role: form.role.value,
                                    accountCode: form.accountCode.value,
                                    accountName: form.accountName.value,
                                    email: form.email.value,
                                    phoneNumber: form.phoneNumber.value,
                                    senderId: form.senderId.value,
                                    password: form.password.value,
                                  };
                                  await handleEditAccount(data, () => form.reset());
                                  setIsEditModalOpen(false);
                                }}
                              >
                                <div>
                                  <Label htmlFor="firstName">* First Name</Label>
                                  <Input id="firstName" defaultValue={selectedAccount.firstName} className="mt-1" required />
                                </div>
                                <div>
                                  <Label htmlFor="lastName">* Last Name</Label>
                                  <Input id="lastName" defaultValue={selectedAccount.lastName} className="mt-1" required />
                                </div>
                                <div>
                                  <Label htmlFor="userName">* User Name</Label>
                                  <Input id="userName" defaultValue={selectedAccount.userName} className="mt-1" required />
                                </div>
                                <div>
                                  <Label htmlFor="smsAmount">* SMS Amount</Label>
                                  <Input id="smsAmount" defaultValue={selectedAccount.smsUnits} className="mt-1" required />
                                </div>
                                <div>
                                  <Label htmlFor="role">* Role</Label>
                                  <Select defaultValue={selectedAccount.role}>
                                    <SelectTrigger id="role" className="mt-1">
                                      <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="admin">Admin</SelectItem>
                                      <SelectItem value="user">User</SelectItem>
                                      <SelectItem value="manager">Manager</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="accountCode">* Account Code</Label>
                                  <Input id="accountCode" defaultValue={selectedAccount.accountCode} className="mt-1" required />
                                </div>
                                <div>
                                  <Label htmlFor="accountName">* Account Name</Label>
                                  <Input id="accountName" defaultValue={selectedAccount.accountName} className="mt-1" required />
                                </div>
                                <div>
                                  <Label htmlFor="email">* Email</Label>
                                  <Input id="email" defaultValue={selectedAccount.email} className="mt-1" required />
                                </div>
                                <div>
                                  <Label htmlFor="phoneNumber">* Phone Number</Label>
                                  <Input id="phoneNumber" defaultValue={selectedAccount.phoneNumber} className="mt-1" required />
                                </div>
                                <div>
                                  <Label htmlFor="senderId">* Sender ID</Label>
                                  <Input id="senderId" defaultValue={selectedAccount.senderId} className="mt-1" required />
                                </div>
                                <div className="col-span-2">
                                  <Label htmlFor="password">* Password</Label>
                                  <Input id="password" type="password" defaultValue={selectedAccount.password} className="mt-1" required />
                                </div>
                                <div className="col-span-2 flex items-center space-x-4 mt-2">
                                  <Button type="submit" className="bg-blue-600 text-white">Save</Button>
                                  <DialogClose asChild>
                                    <Button type="button" variant="outline" className="text-blue-600 border-blue-600" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                                  </DialogClose>
                                </div>
                              </form>
                            )}
                          </DialogContent>
                        </Dialog>

                        {/* User Account Details Icon */}
                        <Dialog open={isDetailsModalOpen && selectedAccount?.id === account.id} onOpenChange={setIsDetailsModalOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="p-2 border-gray-200 text-gray-600 hover:bg-gray-100"
                              onClick={() => setSelectedAccount(account) || setIsDetailsModalOpen(true)}
                            >
                              <User className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-xl w-full">
                            <DialogHeader>
                              <DialogTitle>User Account Details</DialogTitle>
                            </DialogHeader>
                            {selectedAccount && (
                              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                <div><strong>First Name:</strong> {selectedAccount.firstName}</div>
                                <div><strong>Last Name:</strong> {selectedAccount.lastName}</div>
                                <div><strong>User Name:</strong> {selectedAccount.userName}</div>
                                <div><strong>Account Name:</strong> {selectedAccount.accountName}</div>
                                <div><strong>Account Code:</strong> {selectedAccount.accountCode}</div>
                                <div><strong>Email:</strong> {selectedAccount.email}</div>
                                <div><strong>Phone Number:</strong> {selectedAccount.phoneNumber}</div>
                                <div><strong>SMS Units:</strong> {selectedAccount.smsUnits}</div>
                                <div><strong>Sender ID:</strong> {selectedAccount.senderId}</div>
                                <div><strong>Status:</strong> {selectedAccount.accountStatus}</div>
                                <div><strong>Role:</strong> {selectedAccount.role}</div>
                              </div>
                            )}
                            <div className="mt-4">
                              <DialogClose asChild>
                                <Button variant="outline" className="text-blue-600 border-blue-600" onClick={() => setIsDetailsModalOpen(false)}>Close</Button>
                              </DialogClose>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-4 border-t bg-gray-50">
                  <div className="text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} accounts
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={goToPrevious} disabled={currentPage === 1} className="flex items-center">
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => goToPage(page)} className={`w-8 h-8 p-0 ${currentPage === page ? "bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white" : "text-gray-700 hover:bg-gray-100"}`}>{page}</Button>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" onClick={goToNext} disabled={currentPage === totalPages} className="flex items-center">
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </div>
  );
}
