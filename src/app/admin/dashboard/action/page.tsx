// admin/dashboard/action.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { User, MonthlyData } from "../lib/types";
import { generateMockData } from "../lib/utils";
import Notification from "./components/Notification";
import SalaryDetails from "./components/SalaryDetails";
import AddEntryForm from "./components/AddEntryForm";
import NavigationBar from "./components/NavigationBar";


const ActionPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const selectedMonth = searchParams.get("month");
  const [userData, setUserData] = useState<User | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (userId) {
      const allData = generateMockData().flatMap((month) => month.employees);
      const selectedUser = allData.find((user) => user.id.toString() === userId);
      setUserData(selectedUser || null);
    }
  }, [userId]);

  if (!userData || !selectedMonth) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>{userData ? "Please select a valid month." : "User not found. Please select a valid user."}</p>
        <button onClick={() => router.back()} className="text-blue-500">
          Go back
        </button>
      </div>
    );
  }

  const monthData = userData.monthlyData.find((data) => data.month === selectedMonth) as MonthlyData;

  const handleAddEntry = (name: string, amount: number, isAllowance: boolean) => {
    const newEntry = { name, amount };
    if (isAllowance) {
      monthData.allowances.push(newEntry);
    } else {
      monthData.deductions.push(newEntry);
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  return (
    <div className="bg-gray-800 min-h-screen">
      <NavigationBar userId={userId!} />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">
          {userData.name} - Details for {selectedMonth}
        </h2>
        <p className="text-lg mb-2 text-gray-300">Position: {userData.position}</p>
        <p className="text-lg mb-2 text-gray-300">Department: {userData.department}</p>
        <p className="text-lg mb-2 text-gray-300">Status: {userData.status}</p>

        <SalaryDetails monthData={monthData} />
        <AddEntryForm onAddEntry={handleAddEntry} />
        <Notification message="Successfully updated" visible={showNotification} />
      </div>
    </div>
  );
};

const ActionPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ActionPageContent />
    </Suspense>
  );
};

export default ActionPage;