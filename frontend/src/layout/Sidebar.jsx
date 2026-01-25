import { NavLink } from "react-router-dom";
import {
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  BarChart3,
} from "lucide-react";

export default function Sidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
  onToggleCollapse,
  onOpenMobile,
}) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

{!mobileOpen && (
  <button
    onClick={onOpenMobile}
    className="
      fixed top-6 left-4 z-50
      w-10 h-10
      rounded-full
      bg-[#ecf7f4]
      border border-[#c3d6d0]
      flex items-center justify-center
      text-slate-700
      md:hidden
    "
  >
    <PanelLeftOpen size={18} />
  </button>
)}

<aside
  className={`
    fixed md:static z-50 h-full
    bg-[#ecf7f4]
    border border-[#c3d6d0]
    rounded-xl
    transition-transform duration-300

    ${collapsed ? "md:w-20" : "md:w-64"}
    md:translate-x-0
    w-64
    ${mobileOpen ? "translate-x-0" : "-translate-x-[110%]"}
    md:translate-x-0
  `}
>

        {/* ===== HEADER ===== */}
        <div className="h-20 flex items-center px-4 text-slate-800">

       {/* Mobile CLOSE button */}
{mobileOpen && (
  <button
    onClick={onCloseMobile}
    className="
      md:hidden
      absolute top-6 right-4
      w-8 h-8
      rounded-full
      bg-[#ecf7f4]
      border border-[#c3d6d0]
      flex items-center justify-center
      text-slate-700
    "
  >
    <PanelLeftClose size={16} />
  </button>
)}

{/* Desktop collapse toggle */}
<button
  onClick={onToggleCollapse}
  className="
    hidden md:flex
    absolute top-6 -right-4
    w-8 h-8
    rounded-full
    bg-[#ecf7f4]
    border border-[#c3d6d0]
    items-center justify-center
    text-slate-700
    hover:bg-[#e2f1ec]
  "
>
  {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
</button>
          {/* Left: App icon + name */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold">
              I
            </div>

            {!collapsed && (
              <span className="text-xl font-semibold">InsightX</span>
            )}
          </div>
        </div>

        <div className="mx-4 my-3 h-px bg-[#9fb7b0]" />
        
        {/* ===== NAVIGATION ===== */}
        <nav className="mt-4 space-y-1 px-2">
        <NavLink to="/portfolio">
  {({ isActive }) => (
    <div
      className={`
        relative flex items-center gap-3 px-3 py-2 rounded-md
        text-slate-600 hover:bg-teal-50
        ${isActive ? "text-teal-700 font-medium" : ""}
      `}
    >
      {/* Left indicator bar */}
      {isActive && (
        <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-teal-500 rounded-full" />
      )}

      <LayoutDashboard size={20} />
      {!collapsed && <span>Portfolio</span>}
    </div>
  )}
</NavLink>

<NavLink to="/insights">
  {({ isActive }) => (
    <div
      className={`
        relative flex items-center gap-3 px-3 py-2 rounded-md
        text-slate-600 hover:bg-teal-50
        ${isActive ? "text-teal-700 font-medium" : ""}
      `}
    >
      {isActive && (
        <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-teal-500 rounded-full" />
      )}

      <BarChart3 size={20} />
      {!collapsed && <span>Insights</span>}
    </div>
  )}
</NavLink>

        </nav>
      </aside>
    </>
  );
}
