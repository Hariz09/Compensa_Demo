"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, UserCog, MoveRight, Shield, Briefcase } from 'lucide-react';
import Link from "next/link";

// Define the type for feature objects
interface Feature {
  title: string;
  description: string;
  icon: JSX.Element; // Use JSX.Element for React components
  gradient: string;
}

export default function HomePage() {
  const features: Feature[] = [
    {
      title: "Employee Access",
      description: "View your personal salary information and payment history",
      icon: <Users className="h-8 w-8 text-cyan-400" />,
      gradient: "from-cyan-500/10 to-cyan-500/20"
    },
    {
      title: "Manager Dashboard",
      description: "Monitor team salaries and submit change requests",
      icon: <Briefcase className="h-8 w-8 text-emerald-400" />,
      gradient: "from-emerald-500/10 to-emerald-500/20"
    },
    {
      title: "HR Administration",
      description: "Complete salary management and employee administration",
      icon: <UserCog className="h-8 w-8 text-fuchsia-400" />,
      gradient: "from-fuchsia-500/10 to-fuchsia-500/20"
    },
    {
      title: "Secure Platform",
      description: "Role-based access control and data protection",
      icon: <Shield className="h-8 w-8 text-amber-400" />,
      gradient: "from-amber-500/10 to-amber-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 sm:text-5xl min-h-14">
              Welcome to the Salary Management System
            </h3>
            <p className="mt-2 text-xl text-gray-400">
              Streamline your salary management process with our comprehensive platform
            </p>
            <div className="mt-8 flex flex-wrap justify-center">
            <Link
            href="/login"
            className="transition ease-in-out delay-150 flex items-center gap-3 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-600 hover:-translate-y-1 hover:scale-110  px-6 py-2 text-sm font-medium text-white md:text-base bg-[length:200%_200%]">
            <span>Log in</span> <MoveRight className="w-5 md:w-6" />
          </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`hover:scale-105 transition-all duration-300 bg-gradient-to-br ${feature.gradient} border-none backdrop-blur-sm bg-opacity-10`}
            >
              <CardHeader>
                <div className="flex justify-center">{feature.icon}</div>
                <CardTitle className="text-center text-gray-100">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative mt-5">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-emerald-500/20 blur-3xl" />
        <div className="relative">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                Ready to streamline your salary management?
              </h2>
              <p className="mt-4 text-xl text-gray-300">
                Get started today with our easy-to-use platform
              </p>
              <div className="mt-8 flex flex-wrap justify-center">
              <Link
                href="/about"
                className="transition ease-in-out delay-150 flex items-center gap-3 rounded-lg border-gray-600 bg-slate-200/30 backdrop-blur-lg hover:-translate-y-1 hover:scale-110  px-6 py-2 text-sm font-medium text-white md:text-base bg-[length:200%_200%]">
                <span>Learn More</span> 
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
