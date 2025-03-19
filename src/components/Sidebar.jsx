// Sidebar.jsx
import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 p-4">
      {/* User Profile */}
      <div className="flex items-center mb-6">
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="font-semibold">Dr. Jane Smith</p>
          <p className="text-sm text-gray-500">jane.smith@hospital.com</p>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center p-3 bg-white rounded-lg shadow hover:bg-gray-50">
          <span className="mr-3">📤</span> Upload Report
        </button>
        <button className="w-full flex items-center p-3 bg-white rounded-lg shadow hover:bg-gray-50">
          <span className="mr-3">📊</span> New Analysis
        </button>
        <button className="w-full flex items-center p-3 bg-white rounded-lg shadow hover:bg-gray-50">
          <span className="mr-3">🔔</span> Set Alerts
        </button>
        <button className="w-full flex items-center p-3 bg-white rounded-lg shadow hover:bg-gray-50">
          <span className="mr-3">👩‍⚕️</span> Contact Doctor
        </button>
      </div>

      {/* Sign Out */}
      <button className="mt-6 w-full flex items-center p-3 text-red-500 hover:bg-gray-50">
        <span className="mr-3">🚪</span> Sign out
      </button>
    </div>
  );
};

export default Sidebar;
