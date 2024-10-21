"use client";

import React, { useState } from 'react';
import { Card } from "../ui/card";
import { ReturnButton, LoginButton} from "../ui/button";
import { RoleTabs } from "../ui/tabs";
import { LoginInput } from "../ui/login_input";

type Role = 'employee' | 'manager' | 'admin';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<Role>('employee'); // Track selected role
  const [usernameWarning, setUsernameWarning] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 20) {
      setUsernameWarning('Username limit reached (max 20 characters).');
    } else {
      setUsernameWarning('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 25) {
      setPasswordWarning('Password limit reached (max 25 characters).');
    } else {
      setPasswordWarning('');
    }
  };

  const roleConfigs = {
    employee: {
      label: 'Employee',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      iconColor: 'text-blue-500',
    },
    manager: {
      label: 'Manager',
      buttonColor: 'bg-purple-500 hover:bg-purple-600',
      iconColor: 'text-purple-500',
    },
    admin: {
      label: 'Admin',
      buttonColor: 'bg-green-500 hover:bg-green-600',
      iconColor: 'text-green-500',
    },
  };

  return (
    <div className="flex items-center justify-center h-screen min-h-screen bg-gray-950 text-gray-100 relaive">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-emerald-500/20 blur-3xl"></div>
      <ReturnButton href='/' className=''></ReturnButton>

      <Card className="w-full max-w-md p-8 border border-gray-500 bg-slate-800/30 backdrop-blur-lg">
        <RoleTabs selectedRole={selectedRole} setSelectedRole={setSelectedRole} />

        <div
          className="py-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 text-3xl text-center"
          style={{ userSelect: 'none' }}
        >
          Login to Your Account
        </div>
        <div className='text-gray-400 text-center mb-8' style={{ userSelect: 'none' }}>
          Select your role and enter your credentials
        </div>

        <div className="space-y-6" style={{ userSelect: 'none' }}>
          <LoginInput
            label={roleConfigs[selectedRole].label}
            iconColor={roleConfigs[selectedRole].iconColor}
            maxLength={20}
            placeholder={`${roleConfigs[selectedRole].label} Username`}
            onChange={handleUsernameChange}
            warning={usernameWarning}
          />
          <LoginInput
            label="Password"
            iconColor={roleConfigs[selectedRole].iconColor}
            maxLength={25}
            placeholder="Password"
            onChange={handlePasswordChange}
            warning={passwordWarning}
          />
          <LoginButton
            label={roleConfigs[selectedRole].label}
            buttonColor={roleConfigs[selectedRole].buttonColor}
          />
        </div>
      </Card>
    </div>
  );
}
