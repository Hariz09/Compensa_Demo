import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Trash2 } from 'lucide-react'

type Employee = {
  id: number
  name: string
  department: string
  totalSalary: number
  status: string
}

type EmployeeItemProps = {
  employee: Employee
  month: string
  isSelected: boolean
  onToggle: () => void
  onStatusChange: (id: number, status: string) => void
}

export function EmployeeItem({ employee, month, isSelected, onToggle, onStatusChange }: EmployeeItemProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleStatusChange = () => {
    onStatusChange(employee.id, 'Paid')
    setIsDialogOpen(false)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onToggle}
            className="bg-gray-700 border-gray-600 text-gray-200 rounded"
          />
          <div>
            <p className="font-medium text-white">{employee.name}</p>
            <p className="text-sm text-gray-400">{employee.department}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <p className="font-medium text-gray-200">${employee.totalSalary.toLocaleString()}</p>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setIsDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="bg-gray-800 text-gray-200 border border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to set {employee.name}&apos;s {month} salary as &quot;Paid&quot;?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-700 text-gray-200 hover:bg-gray-600">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleStatusChange} className="bg-red-600 text-white hover:bg-red-700">
              Yes, set as Paid
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}