import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SidebarLayout from "@/components/SidebarLayout";
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
  Calendar,
  BarChart2,
  Phone,
  CalendarDays,
} from "lucide-react";

interface ReportType {
  id: string;
  title: string;
  icon: React.ElementType;
}

const reportTypes: ReportType[] = [
  {
    id: "dates",
    title: "Dates Report",
    icon: Calendar,
  },
  {
    id: "provider",
    title: "Provider Report", 
    icon: BarChart2,
  },
  {
    id: "phone",
    title: "Phone Number",
    icon: Phone,
  },
  {
    id: "provider-dates",
    title: "Provider Dates Report",
    icon: CalendarDays,
  },
];

export default function Reports() {
  return (
    <SidebarLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900">Reports</h1>
        </div>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <Card key={report.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[hsl(213,87%,42%)] transition-colors">
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
      </div>
    </SidebarLayout>
  );
}