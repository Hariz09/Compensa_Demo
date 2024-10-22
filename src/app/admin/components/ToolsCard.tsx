import React from 'react';
import Link from 'next/link';
import { UserPlus, Scroll, DollarSign } from 'lucide-react';

const AdminToolsCard = () => {
  return (
    <div className="bg-gray-800 rounded-lg mb-8">
      <div className="p-6">
        <h2 className="text-xl font-semibold">Admin Tools</h2>
        <div className="space-y-3 flex flex-col pt-4">
          <Link href="/add-employee" passHref>
            <button
              className="w-full flex items-center justify-start px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              <UserPlus className="mr-2" />
              Add Employee
            </button>
          </Link>

          <Link href="/request-log" passHref>
            <button
              className="w-full flex items-center justify-start px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              <Scroll className="mr-2" />
              Request Log
            </button>
          </Link>

          <Link href="/unpaid-summary" passHref>
            <button
              className="w-full flex items-center justify-start px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              <DollarSign className="mr-2" />
              Unpaid Summary
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminToolsCard;
