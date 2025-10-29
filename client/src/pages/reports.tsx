import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import SidebarLayout from "@/components/SidebarLayout";
import { Calendar, BarChart2, Phone, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

interface ReportType {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  endpoint: string;
  columns: string[];
  filterByDate?: boolean;
  manualView?: boolean;
}

const reportTypes: ReportType[] = [
  {
    id: "DatesReport",
    title: "Dates Report",
    icon: Calendar,
    description: "View reports by date range.",
    endpoint: "http://172.27.34.87:8080/telonenfe/sms/report/count/date",
    columns: ["provider", "total", "success", "failed"],
    filterByDate: true,
    manualView: true,
  },
  {
    id: "provider",
    title: "Provider Report",
    icon: BarChart2,
    description: "View provider statistics.",
    endpoint: "http://172.27.34.87:8080/telonenfe/sms/report/count/providers",
    columns: ["name", "total", "success", "failed"],
    manualView: true, // ✅ Provider report uses View button
  },
  {
    id: "phone",
    title: "Phone Number",
    icon: Phone,
    description: "View reports by phone numbers.",
    endpoint: "http://172.27.34.87:8080/telonenfe/sms/report/count/phone",
    columns: [
      "providerName",
      "type",
      "message",
      "status",
      "destinationAddress",
      "sourceAddress",
      "requestType",
      "dateReceived",
      "accountCode",
    ],
    manualView: false, // ✅ Automatically loads data, no View button
  },
  {
    id: "provider-dates",
    title: "Provider Dates Report",
    icon: CalendarDays,
    description: "View provider reports by date.",
    endpoint:
      "http://172.27.34.87:8080/telonenfe/sms/report/count/provider-dates",
    columns: ["name", "total", "success", "failed"],
    filterByDate: true,
    manualView: true,
  },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const selectReport = (report: ReportType) => {
    setSelectedReport(report);
    setStartDate("");
    setEndDate("");
    setData([]);
    setError(null);

    // Auto-load for phone number report
    if (!report.manualView) {
      fetchData(report);
    }
  };

  const fetchData = async (report: ReportType) => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      let url = report.endpoint;

      // Handle date-based reports
      if (report.filterByDate) {
        if (!startDate || !endDate) {
          alert("Please select both start and end dates");
          setLoading(false);
          return;
        }
        const start = `${startDate} 00:00:00`;
        const end = `${endDate} 23:59:59`;
        url = `${url}/${encodeURIComponent(start)}/${encodeURIComponent(end)}`;
      }

      console.log("Fetching:", url);

      const res = await fetch(url);
      if (!res.ok)
        throw new Error(`Failed to fetch report data: ${res.status}`);

      const result = await res.json();
      console.log("Result:", result);

      setData(Array.isArray(result) ? result : []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleView = () => {
    if (selectedReport) {
      fetchData(selectedReport);
    }
  };

  return (
    <div>
      <Navbar />
      <SidebarLayout>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-semibold text-gray-900">Reports</h1>
          </div>

          {/* Report Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <Card
                  key={report.id}
                  onClick={() => selectReport(report)}
                  className={`transition-shadow cursor-pointer group hover:shadow-lg ${
                    selectedReport?.id === report.id
                      ? "border-[hsl(213,87%,42%)] border-2"
                      : ""
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100 group-hover:bg-[hsl(213,87%,42%)] transition-colors">
                        <Icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-700 group-hover:text-[hsl(213,87%,42%)] transition-colors">
                        {report.title}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Selected Report Section */}
          {selectedReport && (
            <div className="max-w-7xl mx-auto p-6 bg-white shadow rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4">
                {selectedReport.title}
              </h2>

              {/* Date Filters + View Button */}
              {(selectedReport.filterByDate || selectedReport.manualView) && (
                <div className="flex flex-wrap gap-4 mb-4 items-end">
                  {selectedReport.filterByDate && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Start Date
                        </label>
                        <input
                          type="date"
                          className="border px-3 py-2 rounded"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          End Date
                        </label>
                        <input
                          type="date"
                          className="border px-3 py-2 rounded"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {/* View Button (hidden for Phone Number) */}
                  {selectedReport.manualView && (
                    <Button
                      onClick={handleView}
                      disabled={loading}
                      className="bg-[hsl(213,87%,42%)] text-white hover:bg-[hsl(213,87%,36%)]"
                    >
                      {loading ? "Loading..." : "View"}
                    </Button>
                  )}
                </div>
              )}

              {/* Error */}
              {error && <p className="text-red-500 mb-4">{error}</p>}

              {/* Table (always visible) */}
              <div className="overflow-x-auto max-h-[500px] border rounded mt-4">
                <table className="min-w-full border-collapse border border-gray-200 table-auto">
                  <thead className="bg-gray-100 sticky top-0 shadow">
                    <tr>
                      {selectedReport.columns.map((col) => (
                        <th
                          key={col}
                          className="border px-4 py-2 text-left whitespace-nowrap capitalize"
                        >
                          {col.replace(/([A-Z])/g, " $1")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((item, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          {selectedReport.columns.map((col) => (
                            <td
                              key={col}
                              className="border px-4 py-2 whitespace-nowrap"
                            >
                              {item[col] ?? "—"}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={selectedReport.columns.length}
                          className="text-center text-gray-500 py-4"
                        >
                          No data available.{" "}
                          {selectedReport.manualView
                            ? "Click View to load data."
                            : "Select report to view data."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </SidebarLayout>
    </div>
  );
}
