// components/SummaryCards.tsx
import React from 'react';
import { MonthData } from '../types';

interface SummaryCardsProps {
  currentMonthData: MonthData;
  selectedMonth: string;
  filteredEmployeesCount: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  currentMonthData,
  selectedMonth,
  filteredEmployeesCount,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">
          Total Salary Expense ({selectedMonth})
        </h2>
        <p className="text-3xl font-bold">
          ${currentMonthData.totalSalary.toLocaleString()}
        </p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">
          Total Employees ({selectedMonth})
        </h2>
        <p className="text-3xl font-bold">{filteredEmployeesCount}</p>
      </div>
    </div>
  );
};

export default SummaryCards;