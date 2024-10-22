import { MonthlyData, Employee, MonthData } from './types';

export const yAxisFormatter = (value: number) => {
  return `$${(value / 1000)}K`;
};

export const calculateTotalSalary = (monthlyData: MonthlyData): number => {
  const totalAllowances = monthlyData.allowances.reduce(
    (sum, allowance) => sum + allowance.amount,
    0
  );
  const totalDeductions = monthlyData.deductions.reduce(
    (sum, deduction) => sum + deduction.amount,
    0
  );
  return monthlyData.basicSalary + totalAllowances - totalDeductions;
};

export const generateMonthlyDataForEmployee = (
  name: string,
  department: string,
): MonthlyData[] => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  return months.map(month => {
    const basicSalary = Math.floor(Math.random() * 10000) + 10000;
    const allowances = [
      { name: "Daily Allowance", amount: Math.floor(Math.random() * 1000) + 4000 },
      { name: "Transportation", amount: Math.floor(Math.random() * 500) + 2000 },
    ];
    const deductions = [
      { name: "Tax", amount: Math.floor(Math.random() * 2000) + 3000 },
      { name: "Insurance", amount: Math.floor(Math.random() * 500) + 1500 },
    ];

    return {
      month,
      basicSalary,
      allowances,
      deductions,
      totalSalary: calculateTotalSalary({
        month,
        basicSalary,
        allowances,
        deductions,
        totalSalary: 0,
      }),
    };
  });
};

export const generateMockData = (): MonthData[] => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const departments = ["Development", "Design", "HR", "Quality Assurance"];
  const statuses = ["Paid", "Not Paid"];

  const employeeTemplates = [
      {
        id: 1,
        name: "John Doe",
        position: "Senior Developer",
        department: "Development",
      },
      {
        id: 2,
        name: "Jane Smith",
        position: "UI/UX Designer",
        department: "Design",
      },
      {
        id: 3,
        name: "Mike Johnson",
        position: "Junior Developer",
        department: "Development",
      },
      {
        id: 4,
        name: "Sarah Williams",
        position: "Project Manager",
        department: "HR",
      },
      {
        id: 5,
        name: "Anna Cooper",
        position: "Software Engineer",
        department: "Development",
      },
      {
        id: 6,
        name: "Emily Brown",
        position: "Quality Assurance",
        department: "Quality Assurance",
      },
      {
        id: 7,
        name: "David Martin",
        position: "HR Manager",
        department: "HR",
      },
      
  ];

  const employees: Employee[] = employeeTemplates.map(template => ({
    ...template,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    monthlyData: generateMonthlyDataForEmployee(template.name, template.department),
    totalSalary: 0,
  }));

  return months.map((month) => {
    const monthEmployees = employees.map(employee => ({
      ...employee,
      totalSalary: employee.monthlyData.find(data => data.month === month)?.totalSalary || 0
    }));

    return {
      month,
      totalSalary: monthEmployees.reduce((sum, employee) => sum + employee.totalSalary, 0),
      employees: monthEmployees,
    };
  });
};