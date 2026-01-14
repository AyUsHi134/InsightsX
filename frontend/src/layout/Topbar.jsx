import { Bell, Sun } from "lucide-react";
import { useLocation } from "react-router-dom";
import SidebarToggleIcon from "../assets/layouting.png";

export default function Topbar({
  variant,            // "left" | "right"
  collapsed,
  onToggleSidebar,
}) {

  const location = useLocation();

const pageTitleMap = {
  "/portfolio": "Dashboard",
  "/insights": "Insights",
  "/market": "Market",
  "/compare": "Compare",
};

const rawPath = location.pathname.split("/")[1];

const pageTitle =
  pageTitleMap[location.pathname] ||
  (rawPath
    ? rawPath.charAt(0).toUpperCase() + rawPath.slice(1)
    : "Dashboard");


  /* ================= LEFT TOPBAR ================= */
  if (variant === "left") {
    return (
      <header className="h-20 flex items-center px-6 bg-slate-900 text-slate-100">
        <div className="flex items-center gap-4">
          {/* App icon + name */}
          <div className="flex items-center gap-6">
            <div className="w-9 h-9 rounded-md bg-teal-500" />
            <span className="text-xl font-semibold">InsightX</span>
          </div>

          {/* Sidebar toggle */}
          <button
            onClick={onToggleSidebar}
            className="p-2.5 rounded hover:bg-slate-800 transition"
          >
            <img
              src={SidebarToggleIcon}
              alt="Toggle sidebar"
              className={`w-5 h-5 transition-transform ${
                collapsed ? "rotate-180" : ""
              } invert`}
            />
          </button>
        </div>
      </header>
    );
  }

  /* ================= RIGHT TOPBAR ================= */
  return (
    <header className="h-20 flex items-center px-6 bg-slate-900 text-slate-100">
      {/* Context */}
      <div className="flex items-center gap-2 min-w-[180px]">
  <span className="text-base font-medium  text-slate-400">Portfolio</span>
  <span className="text-slate-600 select-none">/</span>
  <span className="text-base font-medium text-slate-200 select-none">
    {pageTitle}
  </span>
</div>


      {/* Search */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search instruments, portfolios, insights…"
          className="
            w-[440px]
            px-5 py-3
            rounded-md
            bg-slate-800
            text-sm text-white
            placeholder-slate-400
            focus:outline-none
            focus:ring-2 focus:ring-teal-500
          "
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Sun className="w-5 h-5 text-slate-300" />
        <Bell className="w-5 h-5 text-slate-300" />
        <div className="w-9 h-9 rounded-full bg-slate-500" />
      </div>
    </header>
  );
}
