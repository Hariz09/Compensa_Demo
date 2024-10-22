// page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from 'next/navigation';
import { generateMockData } from '../utils';
import { MonthData } from '../types';
import LoadingSkeleton, { 
  CardSkeleton, 
  ChartSkeleton, 
  TableSkeleton 
} from '../components/LoadingSkeleton';

const SummaryCards = dynamic(
  () => import('../components/SummaryCards'),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    ),
    ssr: false
  }
);

const SalaryChart = dynamic(
  () => import('../components/SalaryChart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
);

const EmployeeTable = dynamic(
  () => import('../components/EmployeeTable'),
  {
    loading: () => <TableSkeleton />,
    ssr: false
  }
);

const AdminToolsCard = dynamic(
  () => import('../components/ToolsCard'),
  {
    loading: () => <TableSkeleton />,
    ssr: false
  }
);

const AdminDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState<MonthData[]>([]);
  const [currentMonthData, setCurrentMonthData] = useState<MonthData | null>(null);
  
  // Get search params for filtering
  const searchParams = useSearchParams();
  const currentMonth = searchParams.get('month') || 'Jan';
  const currentDepartment = searchParams.get('department') || '';
  const currentSearch = searchParams.get('search') || '';
  const currentStatus = searchParams.get('status') || '';

  // Define available departments
  const departments = ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance', 'Operations'];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const data = generateMockData();
        setMonthlyData(data);
        const initialMonthData = data.find((d) => d.month === currentMonth);
        if (initialMonthData) setCurrentMonthData(initialMonthData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentMonth]);

  useEffect(() => {
    if (monthlyData.length > 0) {
      const monthData = monthlyData.find((d) => d.month === currentMonth);
      if (monthData) setCurrentMonthData(monthData);
    }
  }, [monthlyData, currentMonth]);

  if (isLoading || !currentMonthData) {
    return <LoadingSkeleton />;
  }

  // Filter employees based on URL parameters
  const filteredEmployees = currentMonthData.employees.filter((employee) => {
    const matchesSearch = !currentSearch || 
      employee.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
      employee.position.toLowerCase().includes(currentSearch.toLowerCase());
    
    const matchesDepartment = !currentDepartment || 
      employee.department === currentDepartment;
    
    const matchesStatus = !currentStatus || 
      employee.status === currentStatus;

    const hasMonthData = employee.monthlyData.some(
      (data) => data.month === currentMonth
    );

    return matchesSearch && matchesDepartment && matchesStatus && hasMonthData;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        HRD Dashboard
      </h1>

      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      }>
        <SummaryCards
          currentMonthData={currentMonthData}
          selectedMonth={currentMonth}
          filteredEmployeesCount={filteredEmployees.length}
        />
      </Suspense>

      <Suspense fallback={<ChartSkeleton />}>
        <SalaryChart monthlyData={monthlyData} />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <EmployeeTable
          filteredEmployees={filteredEmployees}
          monthlyData={monthlyData}
          departments={departments}
        />
      </Suspense>
      <Suspense fallback={<TableSkeleton/>}>
        <AdminToolsCard></AdminToolsCard>
      </Suspense>
    </div>
  );
};

export default AdminDashboard;