import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { EmployeeItem } from './EmployeeItem'

type Employee = {
  id: number
  name: string
  department: string
  totalSalary: number
  status: string
}

type MonthCardProps = {
  month: string
  employees: Employee[]
  selectedUsers: Set<number>
  onToggleMonth: () => void
  onToggleUser: (userId: number) => void
  onStatusChange: (userId: number, status: string) => void
}

export function MonthCard({ month, employees, selectedUsers, onToggleMonth, onToggleUser, onStatusChange }: MonthCardProps) {
  return (
    <Card className="bg-gray-800 text-gray-200 border border-gray-700 rounded-lg shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{month}</CardTitle>
        <Checkbox
          checked={employees.every(emp => selectedUsers.has(emp.id))}
          onCheckedChange={onToggleMonth}
          className="bg-gray-700 border-gray-600 text-gray-200 rounded"
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {employees.map(employee => (
            <EmployeeItem
              key={employee.id}
              employee={employee}
              month={month}
              isSelected={selectedUsers.has(employee.id)}
              onToggle={() => onToggleUser(employee.id)}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}