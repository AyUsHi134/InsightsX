/* AppShell Manages: Sidebar collapse state (desktop),
Sidebar overlay state (mobile), Overall layout structure */

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleCollapse = () => setCollapsed(prev => !prev);
  const handleOpenMobile = () => setMobileOpen(true);
  const handleCloseMobile = () => setMobileOpen(false);
  const [theme, setTheme] = useState("light");
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="h-screen w-screen bg-[#eef5fb] overflow-hidden">
      <div className="flex h-full gap-5 p-4">
        
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
          <div className="rounded-xl bg-white shadow-sm pl-6">
          <Topbar
          mobileOpen={mobileOpen}
          onOpenMobile={handleOpenMobile}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          />
          </div>

          {/* Main Content Card */}
          <main 
            className="flex-1 overflow-y-auto rounded-xl bg-white shadow-sm p-6"
            aria-label="Dashboard content"
          >
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}