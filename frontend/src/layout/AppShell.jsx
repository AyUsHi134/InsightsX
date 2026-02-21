/**
 * AppShell - Main layout orchestrator
 * 
 * Manages:
 * - Sidebar collapse state (desktop)
 * - Sidebar overlay state (mobile)
 * - Theme state (light/dark)
 * - Overall layout structure
 */

import { useState, useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * Toggle sidebar collapse (desktop)
   * Memoized to prevent unnecessary re-renders
   */
  const handleToggleCollapse = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  /**
   * Open mobile sidebar overlay
   */
  const handleOpenMobile = useCallback(() => {
    setMobileOpen(true);
  }, []);

  /**
   * Close mobile sidebar overlay
   */
  const handleCloseMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("app-theme");
    return saved || "light";
  });

  /**
   * Toggle theme and persist to localStorage
   */
  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("app-theme", newTheme);
      return newTheme;
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  
  return (
    <div className="h-screen w-screen bg-[var(--app-bg)] overflow-hidden">
      <div className="flex h-full gap-3 p-2">
        
        {/* Sidebar */}
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onCloseMobile={handleCloseMobile}
          onOpenMobile={handleOpenMobile}
          onToggleCollapse={handleToggleCollapse}
        />

        {/* Right Container */}
        <div className="flex flex-col flex-1 min-w-0 gap-4">

          {/* Topbar Card */}
          <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
          <Topbar
          mobileOpen={mobileOpen}
          onOpenMobile={handleOpenMobile}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          />
          </div>

          {/* Main Content Card */}
          <main 
            className="flex-1 overflow-y-auto rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-sm p-6"
            role="main"
            aria-label="Dashboard content"
          >
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}

