"use client";

import React from "react";
import Link from "next/link";
import { Search, Edit2, Filter } from "lucide-react";
import { User } from "../lib/types";
import { useRouter, useSearchParams } from "next/navigation";

interface EmployeeTableProps {
  filteredEmployees: User[];
  monthlyData: { month: string }[];
  departments: string[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  filteredEmployees,
  monthlyData,
  departments,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filtersVisible, setFiltersVisible] = React.useState(false);

  // Get current filter values from URL
  const currentMonth = searchParams.get("month") || "Jan"; // Set default to 'Jan'
  const currentDepartment = searchParams.get("department") || "";
  const currentStatus = searchParams.get("status") || "";
  const currentSearch = searchParams.get("search") || "";

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    return params.toString();
  };

  const toggleFilters = () => setFiltersVisible(!filtersVisible);

  const updateUrlWithoutScroll = (queryString: string) => {
    router.replace(`?${queryString}`, { scroll: false });
  };

  const handleDepartmentClick = (department: string) => {
    const newDepartment = currentDepartment === department ? "" : department;
    updateUrlWithoutScroll(createQueryString("department", newDepartment));
  };

  const handleStatusClick = (status: string) => {
    const newStatus = currentStatus === status ? "" : status;
    updateUrlWithoutScroll(createQueryString("status", newStatus));
  };

  const handleMonthClick = (month: string) => {
    updateUrlWithoutScroll(createQueryString("month", month));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    const queryString = createQueryString("search", newSearch);

    // Debounce the URL update
    const timeoutId = setTimeout(() => {
      updateUrlWithoutScroll(queryString);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="bg-gray-800 rounded-t-lg shadow-lg pb-8">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Employee Salary Records</h2>
          <button
            onClick={toggleFilters}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <Filter className="mr-2 h-5 w-5" /> Filters
          </button>
        </div>

        {filtersVisible && (
          <div className="mt-4 bg-gray-700 p-4 rounded space-y-4">
            {/* Status Filter Buttons */}
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2">Status</label>
              <div className="flex flex-wrap gap-2">
                {["All", "Paid", "Not Paid"].map((status) => (
                  <button
                    key={status}
                    onClick={() =>
                      handleStatusClick(status === "All" ? "" : status)
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                                ${
                                                  currentStatus ===
                                                  (status === "All"
                                                    ? ""
                                                    : status)
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-600 hover:bg-gray-500 text-gray-200"
                                                }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Department Filter Buttons */}
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2">
                Department
              </label>
              <div className="flex flex-wrap gap-2">
                {["All", ...departments].map((department) => (
                  <button
                    key={department}
                    onClick={() =>
                      handleDepartmentClick(
                        department === "All" ? "" : department
                      )
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                                ${
                                                  currentDepartment ===
                                                  (department === "All"
                                                    ? ""
                                                    : department)
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-600 hover:bg-gray-500 text-gray-200"
                                                }`}
                  >
                    {department}
                  </button>
                ))}
              </div>
            </div>

            {/* Month Filter Buttons */}
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2">Month</label>
              <div className="flex flex-wrap gap-2">
                {monthlyData.map(({ month }) => (
                  <button
                    key={month}
                    onClick={() => handleMonthClick(month)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                                ${
                                                  currentMonth === month
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-600 hover:bg-gray-500 text-gray-200"
                                                }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex">
              <input
                type="text"
                placeholder="Search employees..."
                defaultValue={currentSearch}
                onChange={handleSearchChange}
                className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow min-w-0"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sticky table header */}
      <div className="px-6 ">
        <table className="w-full bg-gray-900 shadow-xl">
          <thead>
            <tr className="text-left">
              <th className="py-2 pl-2">Name</th>
              <th className="py-2 hidden md:table-cell">Position</th>
              <th className="py-2 hidden sm:table-cell">Department</th>
              <th className="py-2">Total Salary ({currentMonth})</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, index) => {
                const monthData = employee.monthlyData.find(
                  (data) => data.month === currentMonth
                );
                const rowBgColor =
                  index % 2 === 0 ? "bg-gray-700" : "bg-gray-600";
                const statusColor =
                  employee.status === "Paid" ? "bg-green-500" : "bg-red-500";
                return (
                  <tr
                    key={employee.id}
                    className={`${rowBgColor} border-t border-gray-700`}
                  >
                    <td className="py-2 pl-2">{employee.name}</td>
                    <td className="py-2 hidden md:table-cell">
                      {employee.position}
                    </td>
                    <td className="py-2 hidden sm:table-cell">
                      {employee.department}
                    </td>
                    <td className="py-2">
                      $
                      {monthData?.totalSalary
                        ? monthData.totalSalary.toLocaleString()
                        : "N/A"}
                    </td>
                    <td className={`py-2 pr-2 max-w-8`}>
                      <div
                        className={`${statusColor} rounded-2xl text-center text-sm`}
                      >
                        {employee.status}
                      </div>
                    </td>
                    <td className="py-2">
                    <Link
  href={`/admin/dashboard/action?userId=${employee.id}&month=${currentMonth}`}
  className="flex items-center justify-center w-10 h-10 text-gray-300 rounded-lg
             transition-transform duration-200 ease-in-out bg-blue-700 hover:bg-blue-800
             hover:scale-105"
>
  <Edit2 size={20} />
</Link>


                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  No Salary Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
