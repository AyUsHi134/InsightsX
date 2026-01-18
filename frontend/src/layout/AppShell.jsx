import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 64 : 240;

  return (
    <div className="h-screen bg-slate-900 relative">
      {/* ===== TOPBAR ===== */}
      <Topbar
        collapsed={collapsed}
        onToggleSidebar={() => setCollapsed(!collapsed)}
      />

      {/* ===== BODY ===== */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* SIDEBAR */}
        <div
          className="border-r border-slate-700"
          style={{ width: sidebarWidth }}
        >
          <Sidebar collapsed={collapsed} />
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-1 bg-slate-50 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* ===== ARC DIVIDER ONLY ===== */}
<div
  className="pointer-events-none absolute top-0"
  style={{ left: sidebarWidth }}
>
  <svg width="40" height="80">
    <path
      d="
        M 0 0
  L 0 20
  A 20 20 0 0 1 20 40
  A 20 20 0 0 1 0 60
  L 0 80


      "
      fill="none"
      stroke="#334155"
      strokeWidth="1"
    />
  </svg>
</div>
    </div>
  );
}
