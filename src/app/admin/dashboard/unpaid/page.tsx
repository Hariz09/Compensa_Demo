'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { generateMockData } from '../../lib/utils'
import { MonthData } from '../../lib/types'
import { FilterBar } from './components/FilterBar'
import { MonthCard } from './components/MonthCard'
import { CheckoutBar } from './components/CheckoutBar'

export default function UnpaidDashboard() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<MonthData[]>([])
  const [selectedUsers, setSelectedUsers] = useState<Record<string, Set<number>>>({})
  const [selectedMonths, setSelectedMonths] = useState<Set<string>>(new Set())
  const [allSelected, setAllSelected] = useState(false)
  
  const monthFilter = searchParams.get('month') || 'all'
  const departmentFilter = searchParams.get('department') || 'all'
  const searchQuery = searchParams.get('search') || ''

  useEffect(() => {
    const mockData = generateMockData()
    setData(mockData)
    const initialSelectedUsers: Record<string, Set<number>> = {}
    mockData.forEach(monthData => {
      initialSelectedUsers[monthData.month] = new Set()
    })
    setSelectedUsers(initialSelectedUsers)
  }, [])

  const departments = Array.from(
    new Set(data.flatMap(month => month.employees.map(emp => emp.department)))
  )

  const filteredData = data.filter(monthData => {
    if (monthFilter !== 'all' && monthFilter !== monthData.month) return false
    
    return monthData.employees.some(emp => 
      emp.status === 'Not Paid' &&
      (departmentFilter === 'all' || emp.department === departmentFilter) &&
      (!searchQuery || emp.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  const toggleUser = (userId: number, month: string) => {
    const updatedMonthUsers = new Set(selectedUsers[month])
    if (updatedMonthUsers.has(userId)) {
      updatedMonthUsers.delete(userId)
    } else {
      updatedMonthUsers.add(userId)
    }
    setSelectedUsers(prev => ({ ...prev, [month]: updatedMonthUsers }))
  }

  const toggleMonth = (month: string) => {
    const monthUserIds = data.find(m => m.month === month)?.employees.filter(emp => emp.status === 'Not Paid').map(emp => emp.id) || []
    const newSelectedUsers = new Set(selectedUsers[month])
    if (selectedMonths.has(month)) {
      monthUserIds.forEach(id => newSelectedUsers.delete(id))
      setSelectedMonths(prev => new Set(Array.from(prev).filter(m => m !== month)))
    } else {
      monthUserIds.forEach(id => newSelectedUsers.add(id))
      setSelectedMonths(prev => new Set(prev).add(month))
    }
    setSelectedUsers(prev => ({ ...prev, [month]: newSelectedUsers }))
  }

  const selectAll = () => {
    if (allSelected) {
      const clearedSelection: Record<string, Set<number>> = {}
      data.forEach(monthData => {
        clearedSelection[monthData.month] = new Set()
      })
      setSelectedUsers(clearedSelection)
      setSelectedMonths(new Set())
      setAllSelected(false)
    } else {
      const allUnpaidUserIdsByMonth: Record<string, Set<number>> = {}
      data.forEach(monthData => {
        allUnpaidUserIdsByMonth[monthData.month] = new Set(monthData.employees.filter(emp => emp.status === 'Not Paid').map(emp => emp.id))
      })
      setSelectedUsers(allUnpaidUserIdsByMonth)
      setSelectedMonths(new Set(data.map(m => m.month)))
      setAllSelected(true)
    }
  }

  const totalSelectedSalary = Object.keys(selectedUsers).reduce((total, month) => {
    const monthUsers = selectedUsers[month]
    const monthData = data.find(m => m.month === month)
    if (!monthData) return total
    return total + Array.from(monthUsers).reduce((monthTotal, userId) => {
      const user = monthData.employees.find(emp => emp.id === userId)
      return monthTotal + (user?.totalSalary || 0)
    }, 0)
  }, 0)

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    window.history.pushState(null, '', `?${params.toString()}`)
  }

  const prepareCheckoutData = () => {
    const selectedData = data.reduce((acc, monthData) => {
      const selectedEmployees = monthData.employees.filter(emp => selectedUsers[monthData.month]?.has(emp.id))
      if (selectedEmployees.length > 0) {
        acc[monthData.month] = selectedEmployees
      }
      return acc
    }, {} as Record<string, typeof data[0]['employees']>)
    localStorage.setItem('checkoutData', JSON.stringify(selectedData))
  }

  const handleStatusChange = (userId: number, status: string) => {
    setData(prevData => 
      prevData.map(monthData => ({
        ...monthData,
        employees: monthData.employees.map(emp => 
          emp.id === userId ? { ...emp, status } : emp
        )
      }))
    )

    // Remove the user from selectedUsers if they're marked as Paid
    if (status === 'Paid') {
      setSelectedUsers(prevSelected => {
        const updatedSelected = { ...prevSelected }
        Object.keys(updatedSelected).forEach(month => {
          updatedSelected[month].delete(userId)
        })
        return updatedSelected
      })
    }
  }

  return (
    <div className='bg-gray-900 min-h-screen p-6'>
      <div className="container mx-auto text-gray-200">
        <Link 
          href="/admin/dashboard" 
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </Link>

        <h1 className="text-3xl font-bold text-white mt-6 mb-6">Unpaid Salaries Summary</h1>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <FilterBar
              monthFilter={monthFilter}
              departmentFilter={departmentFilter}
              searchQuery={searchQuery}
              months={data.map(m => m.month)}
              departments={departments}
              onMonthChange={(value) => updateSearchParams('month', value)}
              onDepartmentChange={(value) => updateSearchParams('department', value)}
              onSearchChange={(value) => updateSearchParams('search', value)}
            />

            <button
              className={`px-4 py-2 text-white rounded ${allSelected ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
              onClick={selectAll}
            >
              {allSelected ? "Unselect All" : "Select All"}
            </button>
          </div>

          {filteredData.map(monthData => {
            const unpaidEmployees = monthData.employees
              .filter(emp => 
                emp.status === 'Not Paid' &&
                (departmentFilter === 'all' || emp.department === departmentFilter) &&
                (!searchQuery || emp.name.toLowerCase().includes(searchQuery.toLowerCase()))
              )

            if (unpaidEmployees.length === 0) return null

            return (
              <MonthCard
                key={monthData.month}
                month={monthData.month}
                employees={unpaidEmployees}
                selectedUsers={selectedUsers[monthData.month]}
                onToggleMonth={() => toggleMonth(monthData.month)}
                onToggleUser={(userId) => toggleUser(userId, monthData.month)}
                onStatusChange={handleStatusChange}
              />
            )
          })}

          <CheckoutBar
            totalSelectedSalary={totalSelectedSalary}
            onPrepareCheckout={prepareCheckoutData}
          />
        </div>
      </div>
    </div>
  )
}