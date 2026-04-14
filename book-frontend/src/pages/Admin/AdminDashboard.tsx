import React from "react";

export const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-gray-500 font-medium mb-2">Total Sales</h3>
          <p className="text-3xl font-bold text-gray-800">$0.00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-gray-500 font-medium mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-gray-800">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-gray-500 font-medium mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-800">0</p>
        </div>
      </div>
    </div>
  );
};
