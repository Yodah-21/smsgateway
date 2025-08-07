import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, ChevronDown, LogOut, UserPlus } from "lucide-react";
import { Link } from "wouter";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-blue-700 shadow-sm border-b border-gray-200 px-8 lg:px-4 py-4 ml-[287px] "> 
      <div className="flex items-center justify-between">
        <h1 className="text-md font-semibold text-white">TelOne Messaging Portal</h1> 
        <div className="relative flex items-center">
          <div className="flex items-center space-x-1 text-sm text-white cursor-pointer" onClick={toggleDropdown}> {/* Reduced space between items */}
            <User  className="w-4 h-4" />
            <span>User</span>
            <ChevronDown className="w-4 h-8" /> 
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"> {/* Reduced margin */}
              <div className="py-1">
                <Link href="/profile" className="flex items-center px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"> {/* Reduced padding */}
                  <UserPlus className="w-4 h-4 mr-1" /> 
                  My Profile
                </Link>
                <Link href="/login" className="flex items-center px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"> {/* Reduced padding */}
                  <LogOut className="w-4 h-4 mr-1" />
                  Log Out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
