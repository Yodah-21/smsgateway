// src/pages/rep-modal/ProviderReport.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data — replace this with your real data later
const providerData = [
  { name: "Provider A", total: 120, success: 100, fail: 20 },
  { name: "Provider B", total: 80, success: 60, fail: 20 },
  { name: "Provider C", total: 50, success: 45, fail: 5 },
];

const ProviderReport: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Success</TableHead>
            <TableHead>Fail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providerData.map((provider, index) => (
            <TableRow key={index}>
              <TableCell>{provider.name}</TableCell>
              <TableCell>{provider.total}</TableCell>
              <TableCell>{provider.success}</TableCell>
              <TableCell>{provider.fail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProviderReport;
