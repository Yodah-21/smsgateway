import { useEffect, useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import Navbar from "@/components/Navbar";

interface Account {
  fullName: string;
  email: string;
  phone: string;
  accountCode: string;
  senderId: string;
  status: string;
}

export default function Profile() {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://172.27.34.87:8080/telonenfe/accounts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Failed to fetch account");
        }

        const data = await response.json();

        // Assuming API returns a single account or the first in array
        const userAccount = data[0]; 

        setAccount({
          fullName: `${userAccount.firstName} ${userAccount.lastName}`,
          email: userAccount.email,
          phone: userAccount.phoneNumber,
          accountCode: userAccount.accountCode || "N/A",
          senderId: userAccount.senderId || "N/A",
          status: userAccount.accountStatus || "N/A",
        });

      } catch (err: any) {
        setError(err.message || "Failed to fetch account");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SidebarLayout>
        <div className="p-2 w-full min-h-screen">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full min-h-[400px]">
            {/* Card header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <h1 className="text-xl font-semibold text-gray-800">Profile Information</h1>
            </div>

            {/* Card content */}
            <div className="p-8">
              {loading ? (
                <p className="text-center text-gray-500">Loading account information...</p>
              ) : error ? (
                <p className="text-center text-red-600">{error}</p>
              ) : account ? (
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Avatar section */}
                  <div className="flex flex-col items-center lg:items-start lg:w-1/3">
                    <div className="relative mb-4">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg text-white">
                        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="8" r="5" />
                          <path d="M12 14c-5 0-8 2.5-8 5v1h16v-1c0-2.5-3-5-8-5z" />
                        </svg>
                      </div>
                      <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                    </div>
                    <div className="text-center lg:text-left">
                      <h2 className="text-xl font-bold">{account.fullName}</h2>
                      <p className="text-gray-500 mb-3">Premium User</p>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-sm shadow-md">
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                        {account.status || "ACTIVE"}
                      </div>
                    </div>
                  </div>

                  {/* Details section */}
                  <div className="lg:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { label: "FULL NAME", value: account.fullName },
                        { label: "EMAIL", value: account.email },
                        { label: "PHONE", value: account.phone },
                        { label: "ACCOUNT CODE", value: account.accountCode },
                        { label: "SENDER ID", value: account.senderId },
                      ].map((item) => (
                        <div key={item.label} className="border-b border-gray-100 pb-4">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">{item.label}</p>
                          <p className="text-lg font-semibold text-gray-800">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500">No account information available.</p>
              )}
            </div>
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
}
