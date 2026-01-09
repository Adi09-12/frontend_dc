import { Sparkles, Bell } from "lucide-react";


export function Navbar() {
    return (
        <header className="bg-[#F8FAFC] px-8 py-4 flex items-center justify-between ">
            <div className="relative w-full max-w-6xl border broder-[#E5E7EB] rounded-md shadow-[0.5px_0.5px_2px_0.5px_#432C81]">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2"
                    width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.332 23.3335L16.332 16.3335" stroke="#1D202F" strokeWidth="2" />
                    <circle cx="11.668" cy="11.6665" r="7" stroke="#1D202F" strokeWidth="2" />
                </svg>
                <input
                    placeholder="Search Doctor"
                    className="w-full bg-[#F8F9FD] font-semibold rounded-2xl py-3 pl-12 pr-12 text-md
             outline-none focus:outline-none focus:ring-0 focus:border-none"
                />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 7H15.1667" stroke="#1D202F" strokeWidth="2" />
                    <path d="M3.5 14H9.33333" stroke="#1D202F" strokeWidth="2" />
                    <path d="M14 21H24.5" stroke="#1D202F" strokeWidth="2" />
                    <path d="M12.832 14H24.4987" stroke="#1D202F" strokeWidth="2" />
                    <path d="M3.5 21H10.5" stroke="#1D202F" strokeWidth="2" />
                    <path d="M17.5 7L24.5 7" stroke="#1D202F" strokeWidth="2" />
                    <path d="M18.668 3.5V10.5" stroke="#1D202F" strokeWidth="2" />
                    <path d="M14 17.5V24.5" stroke="#1D202F" strokeWidth="2" />
                    <path d="M9.33203 10.5V17.5" stroke="#1D202F" strokeWidth="2" />
                </svg>
            </div>
            <div className="flex items-center gap-4">
                <button className="hidden md:flex items-center gap-2 bg-linear-to-r from-cyan-400 to-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow">
                    <Sparkles size={16} /> Ask DCO AI
                </button>
                <div className="relative p-2">
                    <Bell size={20} className="text-gray-500" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                </div>
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop"
                />
            </div>
        </header>
    );
}