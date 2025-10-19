'use client';

import React from 'react';

export default function Dashboard() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Budget Dashboard</h2>
      <p className="text-gray-600">
        Welcome to your personal budgeting dashboard. This feature is currently under development.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800">Income</h3>
          <p className="text-2xl font-bold text-blue-600">$0.00</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h3 className="font-semibold text-red-800">Expenses</h3>
          <p className="text-2xl font-bold text-red-600">$0.00</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-800">Balance</h3>
          <p className="text-2xl font-bold text-green-600">$0.00</p>
        </div>
      </div>
    </div>
  );
}
