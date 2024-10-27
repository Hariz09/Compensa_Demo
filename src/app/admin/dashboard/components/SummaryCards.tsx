// components/SummaryCards.tsx
import React from 'react';
import { MonthData } from '../../lib/types';

interface SummaryCardsProps {
  currentMonthData: MonthData;
  selectedMonth: string;
  filteredEmployeesCount: number;
}

// Card Component
interface CardProps {
  title: string;
  value: string | number;
}

const Card: React.FC<CardProps> = ({ title, value }) => (
  <div className="bg-gray-800 p-6 rounded-lg">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

// SummaryCards Component
const SummaryCards: React.FC<SummaryCardsProps> = ({
  currentMonthData,
  selectedMonth,
  filteredEmployeesCount,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <Card
        title={`Total Salary Expense (${selectedMonth})`}
        value={`$${currentMonthData.totalSalary.toLocaleString()}`}
      />
      <Card
        title={`Total Employees (${selectedMonth})`}
        value={filteredEmployeesCount}
      />
    </div>
  );
};

export default SummaryCards;
