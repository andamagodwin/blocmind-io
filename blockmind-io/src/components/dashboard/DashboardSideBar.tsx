import { ChevronLeft } from "lucide-react";

const DashboardSideBar = () => {
    return (
        <div className="h-full bg-red-500">
            <h1>Dashboard Side bar</h1>
            <div className=" rounded-md h-6 w-6 ml-56 bg-white flex align-middle items-center justify-center cursor-pointer">
                <ChevronLeft size={16} color="black" />
            </div>
        </div>
    )
}

export default DashboardSideBar;