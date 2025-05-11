'use client';

import { DashboardHeader, DashboardSideBar } from "@/components/dashboard";
import { useState } from "react";
import { UserRole } from "@/app/config/sidebarItems"; // Import the UserRole type

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
    
    // This should come from your auth system
    const userRole: UserRole = 'student'; // or 'lecturer' or 'admin'

    return (
        <div className="flex h-screen">
            <div className={`h-full bg-slate-800 transition-all duration-200 ${isCollapsed ? 'w-20' : 'w-64'}`}>
                <DashboardSideBar 
                    isCollapsed={isCollapsed} 
                    onCollapse={toggleSidebar}
                    userRole={userRole} // Pass the user role
                />
            </div>
            <div className="flex-1 overflow-auto bg-slate-50">
                <DashboardHeader/>
                <main className="p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}