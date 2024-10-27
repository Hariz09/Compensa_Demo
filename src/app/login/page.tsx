"use client"

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { ReturnButton, LoginButton } from "../../components/ui/button_costume";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginInput } from "./components/login_input";
import { WarningDialog } from "./components/warning";
import { User, Briefcase, UserCog, KeyRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LiveWallpaper from './components/live_wallpaper';

type Role = 'employee' | 'manager' | 'admin';

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>('employee');
  const [usernameWarning, setUsernameWarning] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');
  const [showWarning, setShowWarning] = useState(false);

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

  const handleLoginClick = () => {
    setShowWarning(true);
  };

  const handleWarningConfirm = () => {
    setShowWarning(false);
    router.push(`/${selectedRole}/dashboard`);
  };

  const handleWarningCancel = () => {
    setShowWarning(false);
  };

  const roleConfigs = {
    employee: {
      label: 'Employee',
      buttonColor: 'bg-cyan-500 hover:bg-cyan-600',
      iconColor: 'text-cyan-500',
      tabColor: 'bg-cyan-500/10 data-[state=active]:bg-cyan-500 data-[state=active]:text-white',
      icon: <User className="h-5 w-5" />,
    },
    manager: {
      label: 'Manager',
      buttonColor: 'bg-purple-500 hover:bg-purple-600',
      iconColor: 'text-purple-500',
      tabColor: 'bg-purple-500/10 data-[state=active]:bg-purple-500 data-[state=active]:text-white',
      icon: <Briefcase className="h-5 w-5" />,
    },
    admin: {
      label: 'Admin',
      buttonColor: 'bg-green-500 hover:bg-green-600',
      iconColor: 'text-green-500',
      tabColor: 'bg-green-500/10 data-[state=active]:bg-green-500 data-[state=active]:text-white',
      icon: <UserCog className="h-5 w-5" />,
    },
  };

  return (
    <div className="flex items-center justify-center h-screen min-h-screen bg-gray-950 text-gray-100 relative">
      <LiveWallpaper />
      <ReturnButton href='/' className=''></ReturnButton>

      <Card className="w-full max-w-md p-8 border border-gray-500 bg-slate-800/30 backdrop-blur-lg">
        <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as Role)} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 p-0.5 bg-slate-700/50 rounded-lg overflow-hidden">
            {Object.entries(roleConfigs).map(([role, config]) => (
              <TabsTrigger 
                key={role} 
                value={role} 
                className={`flex items-center justify-center py-2 transition-all duration-200 ease-in-out ${config.tabColor}`}
              >
                {config.icon}
                <span className="ml-2">{config.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div
          className="py-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 text-3xl text-center"
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
            icon={roleConfigs[selectedRole].icon}
            maxLength={20}
            placeholder={`${roleConfigs[selectedRole].label} Username`}
            type="text"
            onChange={handleUsernameChange}
            warning={usernameWarning}
          />
          <LoginInput
            label="Password"
            iconColor={roleConfigs[selectedRole].iconColor}
            icon={<KeyRound />}
            maxLength={25}
            placeholder="Password"
            onChange={handlePasswordChange}
            warning={passwordWarning}
            type="password"
          />
          <LoginButton
            label={roleConfigs[selectedRole].label}
            buttonColor={roleConfigs[selectedRole].buttonColor}
            onClick={handleLoginClick}
          />
        </div>
      </Card>

      <WarningDialog 
        open={showWarning} 
        onConfirm={handleWarningConfirm}
        onCancel={handleWarningCancel}
      />
    </div>
  );
}