import PropTypes from "prop-types";
import { Bell, Search, PanelLeftOpen, Sun, Moon} from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Topbar({ mobileOpen, onOpenMobile, theme, onToggleTheme  }) {
  const location = useLocation();
  const section = location.pathname.split("/")[1] || "portfolio";

  const Actions = (
    <>
    <button
  onClick={onToggleTheme}
  className="
    p-2 rounded-full
    hover:bg-slate-100
    focus:outline-none focus:ring-2 focus:ring-teal-500
    transition-colors
  "
  aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
  type="button"
>
  {theme === "light" ? (
    <Moon className="text-slate-600" size={20} aria-hidden="true" />
  ) : (
    <Sun className="text-slate-600" size={20} aria-hidden="true" />
  )}
</button>

      <button
        className="
          p-2 rounded-full 
          hover:bg-slate-100 
          focus:outline-none focus:ring-2 focus:ring-teal-500
          transition-colors
        "
        aria-label="View notifications"
        type="button"
      >
        <Bell className="text-slate-600" size={20} aria-hidden="true" />
      </button>

      <button
        className="
          w-9 h-9 rounded-full bg-slate-300 
          hover:bg-slate-400 
          focus:outline-none focus:ring-2 focus:ring-teal-500
          transition-colors
        "
        aria-label="Open user profile menu"
        type="button"
      >
        <span className="sr-only">User profile</span>
      </button>
    </>
  );

  return (
    <header
      className="
        bg-white border-b border-slate-200
        px-4 md:px-6
        py-3 md:py-0
        flex flex-col md:flex-row
        md:items-center
        gap-3 md:gap-4
        md:h-20
      "
      role="banner"
    >
      {/* Row 1: Mobile (menu + breadcrumb + actions) | Desktop: breadcrumb only */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Menu Button (ONLY here) */}
          <button
            onClick={onOpenMobile}
            disabled={mobileOpen}
            className="
              md:hidden
              w-10 h-10
              rounded-full
              bg-[#ecf7f4]
              border border-[#c3d6d0]
              flex items-center justify-center
              text-slate-700
              hover:bg-[#e2f1ec]
              focus:outline-none focus:ring-2 focus:ring-teal-500
              transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="main-sidebar"
            type="button"
          >
            <PanelLeftOpen size={18} aria-hidden="true" />
          </button>

          <span
            className="text-base md:text-lg font-semibold text-slate-800 capitalize truncate"
            aria-label={`Current section: ${section}`}
          >
            {section} / Dashboard
          </span>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          {Actions}
        </div>
      </div>

      {/* Search: mobile full width, desktop centered like before */}
      <div className="w-full md:flex-1 md:flex md:justify-center">
        <div className="relative w-full md:max-w-[360px]">
          <label htmlFor="dashboard-search" className="sr-only">
            Search dashboard
          </label>
          <input
            id="dashboard-search"
            type="search"
            className="
              w-full h-11 pl-4 pr-10 
              rounded-full bg-slate-100 
              text-sm outline-none
              focus:ring-2 focus:ring-teal-500
              transition-shadow
            "placeholder="Search..."
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Desktop Actions (right side) */}
      <div className="hidden md:flex items-center gap-2">
        {Actions}
      </div>
    </header>
  );
}

Topbar.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  onOpenMobile: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleTheme: PropTypes.func.isRequired,

};
