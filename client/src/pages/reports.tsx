import { Card, CardContent } from "@/components/ui/card";
import SidebarLayout from "@/components/SidebarLayout";
import { Calendar, BarChart2, Phone, CalendarDays } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useState } from "react";

// Import your components
import DatesReport from "./rep-modal/datesreport";
import PhoneNumber from "./rep-modal/phonenumber";
import ProviderReports from "./rep-modal/providerreports";
import ProviderDatesReport from "./rep-modal/providerdatesreport";

interface ReportType {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  component?: React.ReactNode;
}

const reportTypes: ReportType[] = [
  {
    id: "DatesReport",
    title: "Dates Report",
    icon: Calendar,
    description: "View reports by date range.",
    component: <DatesReport />,
  },
  {
    id: "provider",
    title: "Provider Report",
    icon: BarChart2,
    description: "View provider statistics.",
    component: <ProviderReports />, // ✅ Integrated
  },
  {
    id: "phone",
    title: "Phone Number",
    icon: Phone,
    description: "View reports by phone numbers.",
    component: <PhoneNumber />, // ✅ Integrated
  },
  {
    id: "provider-dates",
    title: "Provider Dates Report",
    icon: CalendarDays,
    description: "View provider reports by date.",
    component: <ProviderDatesReport />, // ✅ Integrated
  },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);

  const selectReport = (report: ReportType) => {
    setSelectedReport(report);
  };

  return (
    <div>
      <Navbar />
      <SidebarLayout>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-semibold text-gray-900">Reports</h1>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <Card
                  key={report.id}
                  onClick={() => selectReport(report)}
                  className="transition-shadow cursor-pointer group hover:shadow-lg"
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
              <div className="mb-4">
                {selectedReport.component ? (
                  selectedReport.component
                ) : (
                  <p>{selectedReport.description}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </SidebarLayout>
    </div>
  );
}
