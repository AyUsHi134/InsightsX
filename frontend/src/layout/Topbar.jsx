import PropTypes from "prop-types";
import { Bell, Search, PanelLeftOpen, Sun, Moon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Topbar({ mobileOpen, onOpenMobile, theme, onToggleTheme }) {
  // -----------------------------
  // 1) Route-based section name
  // -----------------------------
  const location = useLocation();
  const section = location.pathname.split("/")[1] || "portfolio";

  // -----------------------------
  // 2) Dropdown UI states (Topbar-only)
  // -----------------------------
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // -----------------------------
  // 3) Refs for outside-click close
  // -----------------------------
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileSearchRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  // -----------------------------
  // 4) Close dropdowns on outside click
  // -----------------------------
  useEffect(() => {
    const onDocClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (mobileSearchOpen) {
      // focus input immediately when opened (no second click)
      requestAnimationFrame(() => mobileSearchInputRef.current?.focus());
    }
  }, [mobileSearchOpen]);
  

  // -----------------------------
  // 5) Right-side actions (theme, bell, avatar)
  // Used in both mobile + desktop
  // -----------------------------
  const Actions = (
    <>
      {/* Theme toggle */}
      <button
        onClick={onToggleTheme}
        className="
          p-2 rounded-full
          hover:bg-[var(--surface-elevated)] text-[var(--icon-default)] hover:text-[var(--icon-hover)]
          focus:outline-none focus:ring-2 focus:ring-teal-500
          transition-colors
        "
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        type="button"
      >
        {theme === "light" ? (
          <Moon className="text-[var(--icon-default)]" size={20} aria-hidden="true" />
        ) : (
          <Sun className="text-[var(--icon-default)]" size={20} aria-hidden="true" />
        )}
      </button>

      {/* Notifications (badge + dropdown) */}
      <div ref={notifRef} className="relative">
        <button
          onClick={() => setNotifOpen((v) => !v)}
          className="
            p-2 rounded-full
            hover:bg-[var(--surface-elevated)] text-[var(--icon-default)] hover:text-[var(--icon-hover)]
            focus:outline-none
            transition-colors
          "
          aria-label="View notifications"
          type="button"
        >
          <span className="absolute right-2 top-2 w-2 h-2 rounded-full bg-[var(--accent)]" />
          <Bell className="text-[var(--icon-default)]" size={20} aria-hidden="true" />
        </button>

        {notifOpen && (
          <div
            className="
              absolute z-50 right-0 mt-2 w-max whitespace-nowrap max-w-[calc(100vw-24px)]
              rounded-xl border border-[var(--border)]
              bg-[var(--surface)] shadow-sm
              px-3 py-2 text-sm text-[var(--text-secondary)]
            "
            role="menu"
          >
            No new notifications
          </div>
        )}
      </div>

      {/* Profile (avatar + dropdown) */}
      <div ref={profileRef} className="relative">
        <button
          onClick={() => setProfileOpen((v) => !v)}
          className="
            w-9 h-9 rounded-full
            bg-[var(--surface-elevated)]
            hover:bg-[var(--border)]
            focus:outline-none
            transition-colors
          "
          aria-label="Open user profile menu"
          type="button"
        >
          <span className="sr-only">User profile</span>
        </button>

        {profileOpen && (
          <div
            className="
              absolute z-50 right-0 mt-2 w-max whitespace-nowrap max-w-[calc(100vw-24px)] flex flex-col
              rounded-xl border border-[var(--border)]
              bg-[var(--surface)] shadow-sm
              overflow-hidden
            "
            role="menu"
          >
            <button className="w-auto text-left px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]">
              Profile
            </button>
            <button className="w-auto text-left px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]">
              Settings
            </button>
            <button className="w-auto text-left px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]">
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <header
      className="
        bg-[var(--surface)] border-b border-[var(--border)]
        rounded-xl
        px-4 md:px-6
        h-16 md:h-20
        flex flex-row md:flex-row
        items-center
        gap-3 md:gap-4
      "
      role="banner"
    >
     {/* MOBILE LEFT: hide when mobile search is open */}
      <div className="flex items-center gap-3 min-w-0 md:w-auto shrink-0">
        {/* Mobile menu button (only mobile) */}
        <button
          onClick={onOpenMobile}
          disabled={mobileOpen}
          className="
            md:hidden
            w-8 h-8
            rounded-full
            bg-[var(--sidebar-bg)] border border-[var(--border)]
            text-[var(--text-secondary)]
            hover:bg-[var(--surface-elevated)]
            flex items-center justify-center
            focus:outline-none focus:ring-2 focus:ring-teal-500
            transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="main-sidebar"
          type="button"
        >
          <PanelLeftOpen size={16} aria-hidden="true" />
        </button>

        <div className="min-w-0 md:block">
          <div className="text-base font-semibold text-[var(--text-primary)] capitalize truncate md:text-xl">
            {section}
          </div>
          <div className="hidden sm:block text-[13px] text-[var(--text-secondary)] truncate mt-0">
            Dashboard
          </div>
        </div>
      </div>

      {/* CENTER: search (takes remaining space) */}
      <div className="flex-1 hidden min-[421px]:block">
        <div className="relative w-full md:max-w-[480px] md:mx-auto">
          <label htmlFor="dashboard-search" className="sr-only">
            Search dashboard
          </label>
          <input
            id="dashboard-search"
            type="search"
            className="
              w-full h-11 pl-4 pr-10
              rounded-full bg-[var(--surface-elevated)] border border-[var(--border)]
              text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
              text-sm outline-none
              focus:outline-none focus:border-[var(--accent)]
              transition-shadow
            "
            placeholder="Search..."
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--icon-default)] pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* MOBILE SEARCH (only <=420px): takes full available space */}
      <div className="min-[421px]:hidden shrink-0">
        {!mobileSearchOpen ? (
          <div className="flex justify-center">
            <button
              type="button"
              aria-label="Open search"
              onClick={() => setMobileSearchOpen(true)}
              className="
                w-25 h-9 rounded-full
                bg-[var(--surface-elevated)] border border-[var(--border)]
                text-[var(--icon-default)] hover:text-[var(--icon-hover)]
                hover:bg-[var(--surface-elevated)]
                flex items-center justify-center
                focus-visible:outline-none focus-visible:ring-0 focus-visible:border-[var(--accent)]
                transition-colors
              "
            >
              <Search size={18} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="relative w-[180px]">
              <label htmlFor="dashboard-search-mobile" className="sr-only">
                Search dashboard
              </label>

              <input
                ref={mobileSearchInputRef}
                id="dashboard-search-mobile"
                type="search"
                className="
                  w-full h-11 pl-4 pr-10
                  rounded-full bg-[var(--surface-elevated)] border border-[var(--border)]
                  text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
                  text-sm outline-none
                  focus:outline-none focus:border-[var(--accent)]
                "
                placeholder="Search..."
              />

              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--icon-default)] pointer-events-none"
                aria-hidden="true"
              />
            </div>

            <button
              type="button"
              aria-label="Close search"
              onClick={() => setMobileSearchOpen(false)}
              className="
                w-11 h-11 rounded-full
                bg-[var(--surface-elevated)] border border-[var(--border)]
                text-[var(--icon-default)]
                flex items-center justify-center
                focus-visible:outline-none focus-visible:ring-0 focus-visible:border-[var(--accent)]
              "
            >
              ✕
            </button>
          </div>
        )}
      </div>


      {/* MOBILE RIGHT: actions (only mobile) */}
      {!mobileSearchOpen && (
        <div className="flex items-center gap-2 md:hidden">
          {Actions}
        </div>
      )}

      {/* DESKTOP RIGHT: actions (desktop only, unchanged) */}
      <div className="hidden md:flex items-center gap-2">{Actions}</div>
    </header>
  );
}

Topbar.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  onOpenMobile: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};
