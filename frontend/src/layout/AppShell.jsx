import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    // Very very light blue background (SS2 feel)
    <div className="h-screen w-screen bg-[#eef5fb] overflow-hidden">
      <div className="flex h-full gap-4 p-4">
        <div>
        {/* Sidebar = separate dark card */}
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
          onOpenMobile={() => setMobileOpen(true)}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />
        </div>

        {/* Right side = Topbar card + Content card */}
        <div className="flex flex-col flex-1 min-w-0 gap-4 pl-5 md:pl-1">

          {/* Topbar as card */}
          <div className="rounded-xl bg-white shadow-sm">
            <Topbar
              onToggleSidebar={() => setCollapsed(!collapsed)}
              onOpenMobile={() => setMobileOpen(true)}
            />
          </div>

          {/* Main content card */}
          <main className="flex-1 overflow-y-auto rounded-xl bg-white shadow-sm p-6">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}
