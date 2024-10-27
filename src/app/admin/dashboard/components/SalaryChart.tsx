import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { MonthData } from '../../lib/types';
import { yAxisFormatter } from '../../lib/utils';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface SalaryChartProps {
  monthlyData: MonthData[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
  data,
}: TooltipProps<number, string> & { data: MonthData[] }) => {
  if (active && payload && payload.length) {
    const currentData = payload[0]?.payload;
    const totalSalary = currentData ? currentData.totalSalary.toLocaleString() : 'N/A';
    const currentIndex = data.findIndex(d => d.month === currentData.month);
    let trendIndicator = null;
    let salaryColor = '#D1D5DB'; // Default color for no change

    if (currentIndex === 0) {
      trendIndicator = <span style={{ color: 'white', fontWeight: 'bold' }}>—</span>; // En dash for the first item
    } else {
      const currentSalary = currentData?.totalSalary || 0;
      const previousSalary = data[currentIndex - 1]?.totalSalary || 0;
      if (currentSalary > previousSalary) {
        trendIndicator = <ArrowUpCircle color="#84cc16" size={16} />;
        salaryColor = "#84cc16"; // Change color to green for an increase
      } else if (currentSalary < previousSalary) {
        trendIndicator = <ArrowDownCircle color="#ef4444" size={16} />;
        salaryColor = "#ef4444"; // Change color to red for a decrease
      } else {
        trendIndicator = <span style={{ color: 'white', fontWeight: 'bold' }}>—</span>; // En dash for no change
      }
    }

    return (
      <div className="p-3 bg-gray-800 text-white rounded shadow-lg">
        <strong>{label}</strong>
        <p>Total Salary: <span style={{ color: salaryColor }}>{`$${totalSalary}`}</span></p>
        <p>{trendIndicator}</p>
      </div>
    );
  }

  return null;
};


const SalaryChart: React.FC<SalaryChartProps> = ({ monthlyData }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-8">
      <h2 className="text-xl font-semibold mb-4">Salary Expense Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9CA3AF" />
          <YAxis tickFormatter={yAxisFormatter} stroke="#9CA3AF" />
          <Tooltip content={<CustomTooltip data={monthlyData} />} cursor={{ strokeDasharray: '3 3' }} />
          <Area
            type="monotone"
            dataKey="totalSalary"
            stroke="#3B82F6"
            fillOpacity={0.3}
            fill="#3B82F6"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalaryChart;
