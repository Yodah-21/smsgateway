import React, { useState } from "react";

interface ProviderData {
  provider: string;
  total: number;
  success: number;
  failed: number;
}

const mockData: ProviderData[] = [
  { provider: "Provider A", total: 100, success: 80, failed: 20 },
  { provider: "Provider B", total: 50, success: 45, failed: 5 },
  { provider: "Provider C", total: 70, success: 60, failed: 10 },
];

const DatesReportPage: React.FC = () => {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const filteredData = mockData; // Replace with actual filter

  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dates Report</h1>

      <div className="flex gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Provider
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Total
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Success
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Failed
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4">{item.provider}</td>
                <td className="px-6 py-4">{item.total}</td>
                <td className="px-6 py-4">{item.success}</td>
                <td className="px-6 py-4">{item.failed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatesReportPage;
