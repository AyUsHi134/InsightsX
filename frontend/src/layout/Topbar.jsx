import { Bell, Sun, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Topbar({ collapsed, onToggleSidebar }) {
  const location = useLocation();
  const sidebarWidth = collapsed ? 64 : 240;

  const sectionMap = {
    "/portfolio": "Portfolio",
    "/insights": "Insights",
    "/market": "Market",
    "/compare": "Compare",
  };

  const pageMap = {
    "/portfolio": "Dashboard",
    "/insights": "Overview",
    "/market": "Overview",
    "/compare": "Overview",
  };

  const path = `/${location.pathname.split("/")[1] || "portfolio"}`;
  const section = sectionMap[path] || "Portfolio";
  const page = pageMap[path] || "Dashboard";

  return (
    <header className="h-20 bg-slate-900 border-b border-slate-700 relative">
      <div className="h-full flex">

        {/* ===== LEFT ZONE (MATCHES SIDEBAR WIDTH) ===== */}
        <div
          className="flex items-center gap-3 px-4 flex-shrink-0"
          style={{ width: sidebarWidth }}
        >
          <div className="w-9 h-9 rounded-md bg-teal-500" />

          {!collapsed && (
            <span className="text-xl font-semibold text-slate-100">
              InsightX
            </span>
          )}

        </div>

        {/* ===== MINIMIZER (ABSOLUTE, ALIGNED TO ARC) ===== */}
<div
  className="absolute top-1/2 -translate-y-1/2"
  style={{ left: (collapsed ? 64 : 240) - 21}}
>
  <button
    onClick={onToggleSidebar}
    className="
      w-10 h-10
      rounded-full
      bg-slate-800 hover:bg-slate-700
      flex items-center justify-center
      transition
    "
  >
    {collapsed ? (
      <ChevronRight className="w-4 h-4 text-slate-300" />
    ) : (
      <ChevronLeft className="w-4 h-4 text-slate-300" />
    )}
  </button>
</div>


        {/* ===== RIGHT ZONE ===== */}
        <div className="flex-1 flex items-center gap-4 px-6">
          {/* Context */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm text-slate-400">{section}</span>
            <span className="text-slate-600">/</span>
            <span className="text-base font-medium text-slate-200">
              {page}
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-[360px]">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-11 pl-4 pr-10 rounded-full bg-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-md hover:bg-slate-800">
              <Sun className="w-5 h-5 text-slate-300" />
            </button>
            <button className="p-2 rounded-md hover:bg-slate-800">
              <Bell className="w-5 h-5 text-slate-300" />
            </button>
            <button className="w-9 h-9 rounded-full bg-slate-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
