// src/pages/rep-modal/PhoneNumberReport.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Sample data — replace with your real data
const phoneNumberData = [
  {
    providerName: "Provider A",
    type: "SMS",
    message: "Hello",
    status: "Delivered",
    destination: "+263770000000",
    source: "+263780000000",
    requestType: "Transactional",
    dataReceived: "2025-08-18 10:00",
    accountCode: "ACC001",
  },
  {
    providerName: "Provider B",
    type: "SMS",
    message: "Test message",
    status: "Failed",
    destination: "+263771111111",
    source: "+263781111111",
    requestType: "Promotional",
    dataReceived: "2025-08-18 11:00",
    accountCode: "ACC002",
  },
];

const PhoneNumberReport: React.FC = () => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(phoneNumberData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PhoneNumbers");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "PhoneNumberReport.xlsx");
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Export to Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Destination Address</TableHead>
              <TableHead>Source Address</TableHead>
              <TableHead>Request Type</TableHead>
              <TableHead>Data Received</TableHead>
              <TableHead>Account Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {phoneNumberData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.providerName}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.message}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.destination}</TableCell>
                <TableCell>{item.source}</TableCell>
                <TableCell>{item.requestType}</TableCell>
                <TableCell>{item.dataReceived}</TableCell>
                <TableCell>{item.accountCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PhoneNumberReport;
