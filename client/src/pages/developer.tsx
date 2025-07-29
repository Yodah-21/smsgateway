import SidebarLayout from "@/components/SidebarLayout";
import Navbar from "@/components/Navbar"; // Import the Navbar component

export default function DeveloperPortal() {
  return (
    <div>
      <Navbar /> 
      <SidebarLayout>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-lg font-semibold mb-6">TELONE SMS Gateway Integration</h2>

          <ul className="space-y-4 text-gray-800">
            <li>
              <span className="text-blue-600 font-bold mr-2">•</span>
              Download the specification document{" "}
              <a href="#" className="text-blue-600 underline">here</a>
            </li>
            <li>
              <span className="text-blue-600 font-bold mr-2">•</span>
              Make sure you can access the Telone SMS portal and the Telone API gateway. If you cannot, contact the Telone service department.
            </li>
            <li>
              <span className="text-blue-600 font-bold mr-2">•</span>
              Create a user account on this portal.
            </li>
            <li>
              <span className="text-blue-600 font-bold mr-2">•</span>
              The username and password created on the portal will be used as the base parameters on the API call.
            </li>
            <li>
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span className="font-bold">NB:</span> The gateway only supports the HTTP REST protocol. More details can be found in the specification document.
            </li>
            <li>
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span className="font-bold">For more information, send an email to </span>
              <a href="mailto:innovations@telone.co.zw" className="text-blue-600 underline">innovations@telone.co.zw</a>
            </li>
          </ul>
        </div>
      </SidebarLayout>
    </div>
  );
}
