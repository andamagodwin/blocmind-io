'use client'

import { ChevronLeft } from "lucide-react";
import { sidebarItems, UserRole } from "@/app/config/sidebarItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as LucideIcons from "lucide-react";

interface DashboardSideBarProps {
  isCollapsed: boolean;
  onCollapse: () => void;
  userRole: UserRole;
}

const DashboardSideBar = ({ isCollapsed, onCollapse, userRole }: DashboardSideBarProps) => {
  const pathname = usePathname();
  const filteredItems = sidebarItems.filter(item => item.userRoles.includes(userRole));

  return (
    <div className="h-full bg-slate-800 text-white relative transition-all duration-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold">Menu</h1>}
        <button 
          onClick={onCollapse} 
          className="rounded-full h-6 w-6 bg-white flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors"
        >
          <ChevronLeft 
            size={16} 
            color="black" 
            className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Sidebar Items */}
      <div className="flex-1 overflow-y-auto py-4">
        {filteredItems.map((item) => {
            const Icon = LucideIcons[item.icon] as React.ComponentType<{ size: number; className: string }>;

            if (!Icon) {
              console.warn(`Icon "${item.icon}" not found in lucide-react.`);
              return null; // or you can render a default icon
            }
        
            return (
              <Link
                key={item.url}
                href={item.url}
                className={`flex items-center p-3 mx-2 my-1 rounded-md transition-colors
                          ${pathname === item.url ? 'bg-blue-600 text-white' : 'hover:bg-slate-700'}
                          ${isCollapsed ? 'justify-center' : 'justify-start'}`}
              >
                <Icon
                  size={20} 
                  className={`${pathname === item.url ? 'text-white' : 'text-slate-300'}`}
                />
                {!isCollapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            );
          })}

      </div>

      {/* Sidebar Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-700 text-sm text-slate-400">
          {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Panel
        </div>
      )}
    </div>
  );
};

export default DashboardSideBar;