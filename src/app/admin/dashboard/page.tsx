"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "./components/Navbar";
import { useSearchParams } from "next/navigation";
import { generateMockData } from "./lib/utils";
import { MonthData } from "./lib/types";
import LoadingSkeleton, {
  CardSkeleton,
  ChartSkeleton,
  TableSkeleton,
} from "./components/LoadingSkeleton";

const SummaryCards = dynamic(() => import("./components/SummaryCards"), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <CardSkeleton />
      <CardSkeleton />
    </div>
  ),
  ssr: false,
});

const SalaryChart = dynamic(() => import("./components/SalaryChart"), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});

const EmployeeTable = dynamic(() => import("./components/EmployeeTable"), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

// const AdminToolsCard = dynamic(
//   () => import('../components/ToolsCard'),
//   {
//     loading: () => <TableSkeleton />,
//     ssr: false
//   }
// );

const SearchParamsHandler: React.FC<{
  setSearchParams: (
    currentMonth: string,
    currentDepartment: string,
    currentSearch: string,
    currentStatus: string
  ) => void;
}> = ({ setSearchParams }) => {
  const searchParams = useSearchParams();
  const currentMonth = searchParams.get("month") || "Jan";
  const currentDepartment = searchParams.get("department") || "";
  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("status") || "";

  useEffect(() => {
    setSearchParams(
      currentMonth,
      currentDepartment,
      currentSearch,
      currentStatus
    );
  }, [
    currentMonth,
    currentDepartment,
    currentSearch,
    currentStatus,
    setSearchParams,
  ]);

  return null;
};

const AdminDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState<MonthData[]>([]);
  const [currentMonthData, setCurrentMonthData] = useState<MonthData | null>(
    null
  );
  const [filterParams, setFilterParams] = useState({
    currentMonth: "Jan",
    currentDepartment: "",
    currentSearch: "",
    currentStatus: "",
  });

  // Define available departments
  const departments = [
    "HR",
    "Engineering",
    "Sales",
    "Marketing",
    "Finance",
    "Operations",
  ];

  // Wrap setFilterParams in useCallback to ensure a stable reference
  const setSearchParams = useCallback(
    (
      currentMonth: string,
      currentDepartment: string,
      currentSearch: string,
      currentStatus: string
    ) => {
      setFilterParams({
        currentMonth,
        currentDepartment,
        currentSearch,
        currentStatus,
      });
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const data = generateMockData();
        setMonthlyData(data);
        const initialMonthData = data.find(
          (d) => d.month === filterParams.currentMonth
        );
        if (initialMonthData) setCurrentMonthData(initialMonthData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filterParams.currentMonth]);

  useEffect(() => {
    if (monthlyData.length > 0) {
      const monthData = monthlyData.find(
        (d) => d.month === filterParams.currentMonth
      );
      if (monthData) setCurrentMonthData(monthData);
    }
  }, [monthlyData, filterParams.currentMonth]);

  if (isLoading || !currentMonthData) {
    return <LoadingSkeleton />;
  }

  // Filter employees based on URL parameters
  const filteredEmployees = currentMonthData.employees.filter((employee) => {
    const matchesSearch =
      !filterParams.currentSearch ||
      employee.name
        .toLowerCase()
        .includes(filterParams.currentSearch.toLowerCase()) ||
      employee.position
        .toLowerCase()
        .includes(filterParams.currentSearch.toLowerCase());

    const matchesDepartment =
      !filterParams.currentDepartment ||
      employee.department === filterParams.currentDepartment;

    const matchesStatus =
      !filterParams.currentStatus ||
      employee.status === filterParams.currentStatus;

    const hasMonthData = employee.monthlyData.some(
      (data) => data.month === filterParams.currentMonth
    );

    return matchesSearch && matchesDepartment && matchesStatus && hasMonthData;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Suspense>
        <Navbar></Navbar>
      </Suspense>
      <div className="px-8 pt-8">
        <Suspense fallback={<TableSkeleton />}>
            <EmployeeTable
              filteredEmployees={filteredEmployees}
              monthlyData={monthlyData}
              departments={departments}
            />
        </Suspense>
      </div>
      <div className="p-8">
        <Suspense fallback={<LoadingSkeleton />}>
          <SearchParamsHandler setSearchParams={setSearchParams} />
        </Suspense>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          }
        >
          <SummaryCards
            currentMonthData={currentMonthData}
            selectedMonth={filterParams.currentMonth}
            filteredEmployeesCount={filteredEmployees.length}
          />
        </Suspense>

        <Suspense fallback={<ChartSkeleton />}>
          <SalaryChart monthlyData={monthlyData} />
        </Suspense>
        {/* <Suspense fallback={<TableSkeleton/>}>
            <AdminToolsCard />
          </Suspense> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
