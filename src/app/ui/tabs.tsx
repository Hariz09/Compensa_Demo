import React from 'react';
import { User, Briefcase, UserCog } from 'lucide-react';

type Role = 'employee' | 'manager' | 'admin';
interface RoleTabsProps {
  selectedRole: Role;
  setSelectedRole: (role: Role) => void;
}

const roleConfigs = {
  employee: {
    label: 'Employee',
    icon: <User className="h-5 w-5 text-blue-500" />,
  },
  manager: {
    label: 'Manager',
    icon: <Briefcase className="h-5 w-5 text-purple-500" />,
  },
  admin: {
    label: 'Admin',
    icon: <UserCog className="h-5 w-5 text-green-500" />,
  },
};

export function RoleTabs({ selectedRole, setSelectedRole }: RoleTabsProps) {
  return (
    <div className="flex justify-center mb-6">
      {Object.entries(roleConfigs).map(([roleKey, { label, icon }]) => (
        <button
          key={roleKey}
          onClick={() => setSelectedRole(roleKey as Role)}
          className={`flex items-center justify-center px-4 py-2 border-b-2 ${
            selectedRole === roleKey
              ? 'border-blue-500 text-white'
              : 'border-transparent text-gray-400'
          }`}
          style={{ userSelect: 'none' }}
        >
          {icon}
          <span className="ml-2">{label}</span>
        </button>
      ))}
    </div>
  );
}
