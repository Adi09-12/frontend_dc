import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Dashboard } from "./Dashboard";


export default function LayoutDashboard() {
    return (
        <div className="min-h-screen bg-[#F8F9FD] flex ">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto">
                    <Dashboard />
                </main>
            </div>
        </div>
    );
}