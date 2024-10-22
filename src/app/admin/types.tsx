// types.ts
export interface MonthlyData {
  month: string;
  basicSalary: number;
  allowances: Allowance[];
  deductions: Deduction[];
  totalSalary: number;
}

export interface Allowance {
  name: string;
  amount: number;
}

export interface Deduction {
  name: string;
  amount: number;
}

// types.ts
export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string; // Added department field
  status: string; // Added status field (e.g., 'Paid', 'Not Paid')
  monthlyData: MonthlyData[];
  totalSalary: number;
}

export interface MonthData {
  month: string;
  totalSalary: number;
  employees: Employee[];
}
