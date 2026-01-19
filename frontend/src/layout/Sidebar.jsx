import { NavLink } from "react-router-dom";

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile }) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static z-50 h-full
          bg-[#0f1f2d]
          transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 text-white text-xl font-semibold">
          {!collapsed && "InsightX"}
        </div>

        {/* Nav */}
        <nav className="px-4 space-y-2">
          <NavLink
            to="/portfolio"
            className="block px-4 py-2 rounded-md text-slate-200 bg-teal-600"
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/insights"
            className="block px-4 py-2 rounded-md text-slate-300 hover:bg-white/10"
          >
            Insights
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
