import { NavLink } from "react-router-dom";

export default function Sidebar({ collapsed }) {
  return (
    <aside
      className={`
        h-full
        bg-slate-800
        text-slate-200
        transition-all duration-200
        ${collapsed ? "w-16" : "w-60"}
        pt-6
      `}
    >
      <div className="px-4 mb-8">
        {!collapsed && (
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
            Navigation
          </p>
        )}

        <NavItem to="/portfolio" label="Portfolio" collapsed={collapsed} />
        <NavItem to="/insights" label="Insights" collapsed={collapsed} />
      </div>

      <div className="border-t border-slate-700 my-4" />

      <div className="px-4">
        {!collapsed && (
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
            System
          </p>
        )}

        <div className="opacity-50">
          <NavItem label="Market" collapsed={collapsed} disabled />
          <NavItem label="Compare" collapsed={collapsed} disabled />
        </div>
      </div>
    </aside>
  );
}

function NavItem({ to, label, collapsed, disabled }) {
  const base = "block px-3 py-2 rounded-md text-sm transition";

  if (disabled) {
    return (
      <div className={`${base} text-slate-400 cursor-not-allowed`}>
        {collapsed ? label[0] : label}
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${base} ${
          isActive
            ? "bg-teal-600 text-white"
            : "hover:bg-slate-700"
        }`
      }
    >
      {collapsed ? label[0] : label}
    </NavLink>
  );
}
