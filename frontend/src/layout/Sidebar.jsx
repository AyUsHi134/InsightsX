import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  BarChart3,
} from "lucide-react";

/**
 * Sidebar Component
 * 
 * Responsive navigation sidebar with:
 * - Desktop: Collapsible (256px <-> 80px)
 * - Mobile: Overlay with backdrop
 * - Keyboard navigation support
 * - Focus management
 * - Active route indicators
 */
export default function Sidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
  onToggleCollapse,
}) {
  const sidebarRef = useRef(null);
  const firstFocusableRef = useRef(null);

  /**
   * Handle Escape key to close mobile sidebar
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileOpen) {
        onCloseMobile();
      }
    };

    if (mobileOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [mobileOpen, onCloseMobile]);

  /**
   * Focus trap: Focus first element when sidebar opens on mobile
   */
  useEffect(() => {
    if (mobileOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [mobileOpen]);

  /**
   * Prevent body scroll when mobile sidebar is open
   */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="main-sidebar"
        ref={sidebarRef}
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
        `}
        aria-label="Main navigation"
      >

        {/* ===== HEADER ===== */}
        <div className="h-20 flex items-center px-4 text-slate-800 relative">

          {/* Mobile Close Button */}
          {mobileOpen && (
            <button
              ref={firstFocusableRef}
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
                hover:bg-[#e2f1ec]
                focus:outline-none focus:ring-2 focus:ring-teal-500
                transition-colors
              "
              aria-label="Close navigation menu"
              aria-expanded="true"
              aria-controls="main-sidebar"
            >
              <PanelLeftClose size={16} aria-hidden="true" />
            </button>
          )}

          {/* Desktop Collapse Toggle */}
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
              focus:outline-none focus:ring-2 focus:ring-teal-500
              transition-colors
            "
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            aria-controls="main-sidebar"
          >
            {collapsed ? (
              <PanelLeftOpen size={16} aria-hidden="true" />
            ) : (
              <PanelLeftClose size={16} aria-hidden="true" />
            )}
          </button>

          {/* App Icon + Name */}
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold"
              aria-hidden="true"
            >
              I
            </div>

            {!collapsed && (
              <span className="text-xl font-semibold">InsightX</span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 my-3 h-px bg-[#9fb7b0]" aria-hidden="true" />
        
        {/* ===== NAVIGATION ===== */}
        <nav 
          className="mt-4 space-y-1 px-2" 
          role="navigation"
          aria-label="Dashboard navigation"
        >
          
          {/* Portfolio Link */}
          <NavLink to="/portfolio">
            {({ isActive }) => (
              <div
                className={`
                  relative flex items-center gap-3 px-3 py-2 rounded-md
                  text-slate-600 hover:bg-teal-50
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset
                  transition-colors
                  ${isActive ? "text-teal-700 font-medium bg-teal-50/50" : ""}
                `}
                role="menuitem"
                tabIndex="0"
                aria-current={isActive ? "page" : undefined}
              >
                {/* Active Indicator */}
                {isActive && (
                  <span 
                    className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-teal-500 rounded-full"
                    aria-hidden="true"
                  />
                )}

                <LayoutDashboard size={20} aria-hidden="true" />
                {!collapsed && <span>Portfolio</span>}
                
                {/* Screen reader only text when collapsed */}
                {collapsed && (
                  <span className="sr-only">Portfolio</span>
                )}
              </div>
            )}
          </NavLink>

          {/* Insights Link */}
          <NavLink to="/insights">
            {({ isActive }) => (
              <div
                className={`
                  relative flex items-center gap-3 px-3 py-2 rounded-md
                  text-slate-600 hover:bg-teal-50
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset
                  transition-colors
                  ${isActive ? "text-teal-700 font-medium bg-teal-50/50" : ""}
                `}
                role="menuitem"
                tabIndex="0"
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <span 
                    className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-teal-500 rounded-full"
                    aria-hidden="true"
                  />
                )}

                <BarChart3 size={20} aria-hidden="true" />
                {!collapsed && <span>Insights</span>}
                
                {/* Screen reader only text when collapsed */}
                {collapsed && (
                  <span className="sr-only">Insights</span>
                )}
              </div>
            )}
          </NavLink>

        </nav>
      </aside>
    </>
  );
}

// PropTypes validation
Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  onCloseMobile: PropTypes.func.isRequired,
  onToggleCollapse: PropTypes.func.isRequired,
};