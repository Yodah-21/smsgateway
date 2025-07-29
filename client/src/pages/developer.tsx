import SidebarLayout from "@/components/SidebarLayout";

export default function DeveloperPortal() {
  return (
    <SidebarLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-lg font-semibold mb-6">TELONE SMS gateway Integration</h2>
        <div className="mb-4 p-2 bg-blue-100 text-yellow-800 rounded">TESTED BY THE JAVASCRIPT SAGE {Date.now()}</div>
        <ul className="space-y-4 text-gray-800">
          <li>
            <span className="text-blue-600 font-bold mr-2">•</span>
            Download the specification document{" "}
            <a href="#" className="text-blue-600 underline">here</a>
          </li>
          <li>
            <span className="text-blue-600 font-bold mr-2">•</span>
            Make sure you can access the telone sms portal and the Telone api gateway if you cannot contact the Telone service department
          </li>
          <li>
            <span className="text-blue-600 font-bold mr-2">•</span>
            Create a user account on this portal
          </li>
          <li>
            <span className="text-blue-600 font-bold mr-2">•</span>
            The username and password created on the portal portal will be used as the base parameters on the API call
          </li>
          <li>
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span className="font-bold">NB</span>
            The gateway only supports the HTTP REST protocol more details can be found on the specification document
          </li>
          <li>
            <span className="text-blue-600 font-bold mr-2">•</span>
            <span className="font-bold">For more information sent email to </span>
            <a href="mailto:innovations@telone.co.zw" className="text-blue-600 underline">innovations@telone.co.zw</a>
          </li>
        </ul>
      </div>
    </SidebarLayout>
  );
}
