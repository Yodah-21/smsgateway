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
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import SidebarLayout from "@/components/SidebarLayout";
import Navbar from "@/components/Navbar";

interface Account {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  accountName: string;
  email: string;
  smsBalance?: number;
  status: string;
}

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const url = "http://172.27.34.87:8080/telonenfe/accounts";

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch accounts");
        }
        const rawData = await response.json();
        const data: Account[] = rawData.map((account: any) => ({
          ...account,
          smsBalance: account.smsUnits,
          status: account.accountStatus,
        }));
        setAccounts(data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  // Calculate pagination
  const totalItems = accounts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Adjust for last page with few items (merge if last page has only 1-2 items)
  const shouldMergeLastPage = totalItems % itemsPerPage <= 2 && totalItems % itemsPerPage > 0 && totalPages > 1;
  const adjustedTotalPages = shouldMergeLastPage ? totalPages - 1 : totalPages;
  
  // Calculate items to show
  const startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  
  // If we're on the last page and should merge, show more items
  if (currentPage === adjustedTotalPages && shouldMergeLastPage) {
    endIndex = totalItems;
  }
  
  const currentAccounts = accounts.slice(startIndex, endIndex);

  // Reset to first page if current page exceeds total pages
  useEffect(() => {
    if (currentPage > adjustedTotalPages && adjustedTotalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, adjustedTotalPages]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, adjustedTotalPages)));
  };

  const goToPrevious = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const goToNext = () => {
    setCurrentPage(prev => Math.min(adjustedTotalPages, prev + 1));
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <SidebarLayout>
        <div className="w-full px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Accounts</h1>
            <Button className="bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Account
            </Button>
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
                        {account.smsBalance != null
                          ? account.smsBalance.toLocaleString()
                          : "N/A"}
                      </TableCell>
                      <TableCell className="px-3 py-4">{account.status}</TableCell>
                      <TableCell className="px-3 py-4">
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

              {/* Pagination */}
              {adjustedTotalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-4 border-t bg-gray-50">
                  <div className="text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} accounts
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPrevious}
                      disabled={currentPage === 1}
                      className="flex items-center"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>

                    <div className="flex items-center space-x-1">
                      {Array.from({ length: adjustedTotalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(page)}
                          className={`w-8 h-8 p-0 ${
                            currentPage === page
                              ? "bg-[hsl(213,87%,42%)] hover:bg-[hsl(213,87%,35%)] text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNext}
                      disabled={currentPage === adjustedTotalPages}
                      className="flex items-center"
                    >
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
