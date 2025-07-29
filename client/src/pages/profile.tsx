import React from "react";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Avatar & Account Info */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center mb-4">
              {/* Placeholder avatar icon */}
              <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="5" />
                <path d="M12 14c-5 0-8 2.5-8 5v1h16v-1c0-2.5-3-5-8-5z" />
              </svg>
            </div>
            <div className="text-xl font-semibold">Telone Account</div>
            <div className="text-gray-500 mb-2">Surname</div>
            <span className="px-4 py-1 rounded bg-blue-600 text-white font-bold mb-2">ACTIVE</span>
            <button className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">TopUp SMS Balances</button>
          </div>
          {/* Right: Profile Details */}
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500 text-sm">Full Name</div>
                <div className="font-medium"> Surname</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Email</div>
                <div className="font-medium">javascriptsage@gmail.com</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Phone</div>
                <div className="font-medium">263785800241</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Account Code</div>
                <div className="font-medium">testaccount</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Sender Id</div>
                <div className="font-medium">SMS Gateway</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
