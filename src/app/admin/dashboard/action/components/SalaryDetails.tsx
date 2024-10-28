// action/components/SalaryDetails.tsx

import React from "react";
import { MonthlyData } from "../../lib/types";

interface SalaryDetailsProps {
  monthData: MonthlyData;
}

const SalaryDetails: React.FC<SalaryDetailsProps> = ({ monthData }) => {
  return (
    <div className="mt-4 bg-gray-900 p-4 rounded-lg shadow-lg">
      <p className="text-lg mb-2 text-gray-300">Basic Salary: ${monthData.basicSalary.toLocaleString()}</p>
      <p className="text-lg mb-2 text-gray-300">Total Salary: ${monthData.totalSalary.toLocaleString()}</p>

      <h4 className="text-lg font-semibold mt-4 text-gray-300">Allowances</h4>
      <ul className="list-disc pl-6 text-gray-400">
        {monthData.allowances.map((allowance, index) => (
          <li key={index} className="py-1">
            {allowance.name}: ${allowance.amount.toLocaleString()}
          </li>
        ))}
      </ul>

      <h4 className="text-lg font-semibold mt-4 text-gray-300">Deductions</h4>
      <ul className="list-disc pl-6 text-gray-400">
        {monthData.deductions.map((deduction, index) => (
          <li key={index} className="py-1">
            {deduction.name}: ${deduction.amount.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalaryDetails;
