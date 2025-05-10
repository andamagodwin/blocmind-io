import { DashboardHeader,DashboardSideBar } from "@/components/dashboard";

export default function DashboardLayout ({
    children,
}:{
    children:React.ReactNode;
}){
    return (
        <div className="flex h-screen">
            <div className="h-full bg-green-600 w-1/5">
                <DashboardSideBar/>
                
            </div>
            <div className="h-full bg-yellow w-4/5">
                <DashboardHeader/>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}