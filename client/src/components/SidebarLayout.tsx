import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  BarChart3,
  MessageSquare,
  Clock,
  CreditCard,
  Users,
  Building,
  FileText,
  Wallet,
  DollarSign,
  Settings,
  UserPlus,
  LogOut,
} from "lucide-react";
import Log from "@/images/Log.png"; 

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const [location, navigate] = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigationItems = [
    { icon: BarChart3, label: "Dashboard" },
    { icon: MessageSquare, label: "Messages" },
    { icon: Clock, label: "Scheduling Bulk SMS" },
    { icon: CreditCard, label: "Sender Ids" },
    { icon: Users, label: "Accounts Management" },
    { icon: Building, label: "Providers" },
    { icon: FileText, label: "Reports" },
    { icon: Wallet, label: "SMS Account Balances" },
    { icon: DollarSign, label: "Tariffs" },
    { icon: Settings, label: "Developer Portal" },
  ];

  function getNavHref(label: string) {
    switch (label) {
      case "Dashboard": return "/dashboard";
      case "Messages": return "/messages";
      case "Scheduling Bulk SMS": return "/bulk-sms";
      case "Sender Ids": return "/sender-ids";
      case "Accounts Management": return "/accounts";
      case "Providers": return "/providers";
      case "Reports": return "/reports";
      case "SMS Account Balances": return "/sms-balances";
      case "Tariffs": return "/tariffs";
      case "Developer Portal": return "/developer";
      default: return "#";
    }
  }

  const navItems = navigationItems.map(item => ({
    ...item,
    active: location === getNavHref(item.label)
  }));

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  function handleNavClick(href: string, isActive: boolean, label: string) {
    if (href === "#") {
      return; 
    }
    navigate(href);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-72 bg-white shadow-sm h-screen sticky top-2">
          <div className="p-1 border-b border-gray-200"> {/* Reduced padding */}
            <div className="flex items-center">
              <img src={Log} alt="" className="w-44 h-16 mr-1 -mt-7" /> 
            </div>
          </div>
          <nav className="mt-4">
            <ul className="space-y-1 px-4">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const href = getNavHref(item.label);
                return (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(href, item.active, item.label)}
                      className={`w-full text-left flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        item.active
                          ? "text-white bg-[hsl(213,87%,42%)]"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
