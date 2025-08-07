import SidebarLayout from "@/components/SidebarLayout";
import Navbar from "@/components/Navbar";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SidebarLayout>
        {/* Main Content */}
        <div className="p-2 w-full min-h-screen">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full min-h-[400px]">
            {/* Card header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <h1 className="text-xl font-semibold text-gray-800">Profile Information</h1>
            </div>

            {/* Card content */}
            <div className="p-8">
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
                    <h2 className="text-xl font-bold">Telone Account</h2>
                    <p className="text-gray-500 mb-3">Premium User</p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-sm shadow-md">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      ACTIVE
                    </div>
                  </div>
                </div>

                {/* Details section */}
                <div className="lg:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { label: 'FULL NAME', value: 'Surname' },
                      { label: 'EMAIL', value: 'javascriptsage@gmail.com' },
                      { label: 'PHONE', value: '263785800241' },
                      { label: 'ACCOUNT CODE', value: 'testaccount' },
                      { label: 'SENDER ID', value: 'SMS Gateway' },
                    ].map((item) => (
                      <div key={item.label} className="border-b border-gray-100 pb-4">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">{item.label}</p>
                        <p className="text-lg font-semibold text-gray-800">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
}
