import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="
        h-screen
        grid
        grid-cols-[var(--sidebar-width)_1fr]
        grid-rows-[auto_1fr]
        bg-slate-900
      "
      style={{
        "--sidebar-width": collapsed ? "64px" : "240px",
      }}
    >
      {/* TOPBAR LEFT */}
<div className="border-r border-slate-700">
  <Topbar
    collapsed={collapsed}
    onToggleSidebar={() => setCollapsed(!collapsed)}
    variant="left"
  />
</div>

{/* TOPBAR RIGHT */}
<div className="border-b border-slate-700">
  <Topbar variant="right" />
</div>


      {/* SIDEBAR */}
      <div className="border-r border-slate-700">
        <Sidebar collapsed={collapsed} />
      </div>

      {/* MAIN CONTENT */}
      <main className="bg-slate-50 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
