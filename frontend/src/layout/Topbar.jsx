import { Bell, Search, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();
  const section = location.pathname.split("/")[1] || "portfolio";

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center px-6 gap-4">
      <span className="text-lg font-semibold text-slate-800 capitalize">
        {section} / Dashboard
      </span>

      {/* Search */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-[360px]">
          <input
            className="w-full h-11 pl-4 pr-10 rounded-full bg-slate-100 text-sm outline-none"
            placeholder="Search..."
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Actions */}
      <Bell className="text-slate-600" />
      <div className="w-9 h-9 rounded-full bg-slate-300" />
    </header>
  );
}
