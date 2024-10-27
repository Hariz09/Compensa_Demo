import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

type FilterBarProps = {
  monthFilter: string
  departmentFilter: string
  searchQuery: string
  months: string[]
  departments: string[]
  onMonthChange: (value: string) => void
  onDepartmentChange: (value: string) => void
  onSearchChange: (value: string) => void
}

export function FilterBar({
  monthFilter,
  departmentFilter,
  searchQuery,
  months,
  departments,
  onMonthChange,
  onDepartmentChange,
  onSearchChange
}: FilterBarProps) {
  return (
    <div className="space-x-4 flex items-center">
      <Select value={monthFilter} onValueChange={onMonthChange}>
        <SelectTrigger className="w-32 bg-gray-800 text-gray-200 border-gray-700 rounded">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 text-gray-200">
          <SelectItem value="all">All Months</SelectItem>
          {months.map(month => (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={departmentFilter} onValueChange={onDepartmentChange}>
        <SelectTrigger className="w-40 bg-gray-800 text-gray-200 border-gray-700 rounded">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 text-gray-200">
          <SelectItem value="all">All Departments</SelectItem>
          {departments.map(dept => (
            <SelectItem key={dept} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="Search users..."
        className="w-64 bg-gray-800 text-gray-200 border-gray-700 rounded"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}