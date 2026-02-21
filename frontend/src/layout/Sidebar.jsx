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
          className="fixed inset-0 bg-[var(--overlay)] z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="main-sidebar"
        className={`
          fixed md:static z-50 h-full
          bg-[var(--sidebar-bg)] 
          border border-[var(--border)]
          rounded-xl
          transition-transform duration-300

          ${collapsed ? "md:w-[92px]" : "md:w-[280px]"}
          md:translate-x-0
          w-[280px] 
          ${mobileOpen ? "translate-x-0" : "-translate-x-[110%]"}
        `}
        aria-label="Main navigation"
      >

        {/* ===== HEADER ===== */}
        <div className="h-20 flex items-center pl-4 pr-12 text-[var(--text-primary)] relative">

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
              bg-[var(--sidebar-bg)]
              shadow-[0_0_0_1px_var(--border)]
              flex items-center justify-center
              text-[var(--text-secondary)]
              hover:bg-[var(--surface-elevated)]
              hover:text-[var(--text-primary)]
              focus:outline-none
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-[var(--border)]
              transition-colors"
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
            absolute top-6 -right-2
            w-8 h-8
            rounded-full
            bg-[var(--sidebar-bg)]
            shadow-[0_0_0_1px_var(--border)]
            items-center justify-center
            text-[var(--text-secondary)]
            hover:bg-[var(--surface-elevated)]
            hover:text-[var(--text-primary)]
            focus:outline-none
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-[var(--border)]
            transition-colors"
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
              className="w-9 h-9 rounded-lg bg-[var(--brand)] flex items-center justify-center text-white font-bold"
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
        <div className="mx-4 my-3 h-px bg-[var(--border)]" aria-hidden="true" />
        
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
                  text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border)] focus-visible:ring-inset
                  transition-colors
                  ${isActive ? "text-[var(--accent)] font-medium bg-[var(--accent-soft)]" : ""}
                `}
                role="menuitem"
                tabIndex="0"
                aria-current={isActive ? "page" : undefined}
              >
                {/* Active Indicator */}
                {isActive && (
                  <span 
                    className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--accent)] rounded-full"
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
                  text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border)] focus-visible:ring-inset
                  transition-colors
                  ${isActive ? "text-[var(--accent)] font-medium bg-[var(--accent-soft)]" : ""}
                `}
                role="menuitem"
                tabIndex="0"
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <span 
                    className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--accent)] rounded-full"
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