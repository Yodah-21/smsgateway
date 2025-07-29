import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Menu,
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
  ChevronDown,
  User,
  LogOut,
  UserPlus
} from "lucide-react";

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [location, navigate] = useLocation();

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
    if (label === "Dashboard") return "/dashboard";
    if (label === "Messages") return "/messages";
    if (label === "Scheduling Bulk SMS") return "/bulk-sms";
    if (label === "Sender Ids") return "/sender-ids";
    if (label === "Accounts Management") return "/accounts";
    if (label === "Providers") return "/providers";
    if (label === "Reports") return "/reports";
    if (label === "SMS Account Balances") return "/sms-balances";
    if (label === "Tariffs") return "/tariffs";
    if (label === "Developer Portal") return "/developer";
    return "#";
  }

  const navItems = navigationItems.map(item => ({
    ...item,
    active: location === getNavHref(item.label)
  }));

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Add a state to force re-mount
  const [forceRemountKey, setForceRemountKey] = useState(0);

  function handleNavClick(href: string, isActive: boolean, label: string) {
    console.log('NAV CLICK', { label, href, isActive, location });
    if (href === "#") {
      // Prevent navigation to invalid route
      return;
    }
    if (isActive) {
      // If already on the page, force a remount
      setForceRemountKey(prev => prev + 1);
    } else {
      navigate(href);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-blue-700 shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <h1 className="ml-2 text-lg font-semibold text-white">TelOne Messaging Portal</h1>
          </div>
          <div className="relative flex items-center">
            <div className="flex items-center space-x-2 text-sm text-white cursor-pointer" onClick={toggleDropdown}>
              <User className="w-4 h-4" />
              <span>User</span>
              <ChevronDown className="w-4 h-6" />
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="py-1">
                  <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <UserPlus className="w-4 h-4 mr-2" />
                    My Profile
                  </Link>
                  <Link href="/login" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`w-64 bg-white shadow-sm h-screen sticky top-0 transition-transform duration-300 z-50 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Retract Button */}
          <button
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600"
            onClick={() => setSidebarOpen(false)}
            aria-label="Retract Sidebar"
          >
            <span className="sr-only">Retract Sidebar</span>
            &larr;
          </button>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[hsl(213,87%,42%)] rounded-full flex items-center justify-center mr-3">
                <div className="w-4 h-4 border-2 border-white rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-[hsl(213,87%,42%)]">Innovation</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">The Future Is Better Together</p>
          </div>
          <nav className="mt-6">
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
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Main Content */}
        <main className="flex-1 p-6" key={forceRemountKey}>
          {children}
        </main>
      </div>
    </div>
  );
}
