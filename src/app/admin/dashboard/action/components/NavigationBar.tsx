import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NavigationBar = ({ userId }: { userId: string }) => {
  const months = [
    { full: 'January', abbr: 'Jan' },
    { full: 'February', abbr: 'Feb' },
    { full: 'March', abbr: 'Mar' },
    { full: 'April', abbr: 'Apr' },
    { full: 'May', abbr: 'May' },
    { full: 'June', abbr: 'Jun' },
    { full: 'July', abbr: 'Jul' },
    { full: 'August', abbr: 'Aug' },
    { full: 'September', abbr: 'Sep' },
    { full: 'October', abbr: 'Oct' },
    { full: 'November', abbr: 'Nov' },
    { full: 'December', abbr: 'Dec' }
  ];

  const getCurrentMonth = () => {
    const date = new Date();
    return months[date.getMonth()].abbr;
  };

  return (
    <nav className="bg-gray-900 p-4 mb-6 flex items-center justify-between">
      <Link 
        href="/admin/dashboard"
        className="flex items-center text-gray-200 hover:text-white transition-colors"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        <span>Back to Dashboard</span>
      </Link>
      
      <div className="flex-1 max-w-xs mx-auto">
        <Select 
          defaultValue={getCurrentMonth()} 
          onValueChange={(value) => {
            window.location.href = `/admin/dashboard/action?userId=${userId}&month=${value}`;
          }}
        >
          <SelectTrigger className="w-full bg-gray-800 text-gray-200 border-gray-700">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {months.map((month) => (
              <SelectItem 
                key={month.abbr} 
                value={month.abbr}
                className="text-gray-200 hover:bg-gray-700 cursor-pointer"
              >
                {month.full}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-24" /> {/* Spacer to balance the layout */}
    </nav>
  );
};

export default NavigationBar;