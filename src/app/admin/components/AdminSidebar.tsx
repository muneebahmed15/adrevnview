import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/lib/admin/auth";

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/clients", label: "Clients", icon: Users },
  { to: "/admin/invoices", label: "Invoices", icon: FileText },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800 bg-muted flex flex-col min-h-screen">
      <div className="p-5 border-b border-slate-800">
        <Logo link iconClassName="h-8 w-7" textClassName="h-5 w-auto" />
        <p className="text-muted-foreground text-xs mt-2">Admin Panel</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sky-600/20 text-sky-200 border border-sky-500/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-800 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View Site
        </a>
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-red-300 hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
