// src/pages/rep-modal/ProviderDatesReport.tsx
import React, { useState } from "react";

interface ReportRow {
  name: string;
  total: number;
  success: number;
  failed: number;
}

const ProviderDatesReport: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [provider, setProvider] = useState("");
  const [data, setData] = useState<ReportRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = async () => {
    if (!startDate || !endDate || !provider) {
      setError("Please enter provider, start date, and end date.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        `http://172.27.34.87:8080/telonenfe/sms/report/count/provider/${provider}/${startDate}/${endDate}`
      );

      if (!res.ok) throw new Error("Failed to fetch report");

      const result: ReportRow[] = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Provider Dates Report</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Provider Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Provider</label>
          <input
            type="text"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            placeholder="Enter provider name"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={fetchReport}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Generate Report
      </button>

      {/* Error */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Loading */}
      {loading && <p className="mt-4 text-gray-500">Loading...</p>}

      {/* Table */}
      {data.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Success</th>
                <th className="px-4 py-2 border">Failed</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="text-center">
                  <td className="px-4 py-2 border">{row.name}</td>
                  <td className="px-4 py-2 border">{row.total}</td>
                  <td className="px-4 py-2 border">{row.success}</td>
                  <td className="px-4 py-2 border">{row.failed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProviderDatesReport;
