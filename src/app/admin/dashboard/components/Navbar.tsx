import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UserPlus, Scroll, LogOut, DollarSign } from "lucide-react";

interface NavButtonProps {
  icon: React.ElementType;
  title: string;
  href: string;
}

export function Navbar() {
  const NavButton: React.FC<NavButtonProps> = ({ icon: Icon, title, href }) => (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 text-gray-300 rounded-lg 
                 transition-transform duration-200 ease-in-out hover:bg-gray-700 
                 hover:text-white hover:scale-105"
    >
      <Icon size={20} />
      <span className="text-sm">{title}</span>
    </Link>
  );

  return (
    <nav className="bg-gray-800 shadow-lg px-4 py-3">
      <div className="flex justify-start items-center">
        <div className="flex items-center gap-3 mr-auto">
          <Image src="/favicon.ico" width={30} height={30} alt="Vercel Icon" />
          <span className="text-xl font-semibold text-white">
            Admin Dashboard
          </span>
        </div>

        <div className="flex items-center gap-4">
          <NavButton
            icon={UserPlus}
            title="Create User"
            href="/admin/CreateUser"
          />
          <div className="relative inline-flex w-fit">
            <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-red-600 p-1.5 text-xs"></div>
            <NavButton icon={Scroll} title="Logs" href="/admin/requestLog" />
          </div>
          <NavButton icon={DollarSign} title="Unpaid" href="/admin/dashboard/unpaid" />
          <NavButton icon={LogOut} title="LogOut" href="/login" />
        </div>
      </div>
    </nav>
  );
}
