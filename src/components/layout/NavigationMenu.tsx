
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  Users,
  FileText,
  Database,
  CreditCard,
  Calendar,
  BarChart2,
  Search,
  ClipboardList,
  AlertTriangle,
  Settings,
  UserCheck,
  Home,
} from "lucide-react";

interface NavigationItem {
  title: string;
  icon: React.ElementType;
  path: string;
  role: string[];
}

const navigationItems: NavigationItem[] = [
  { title: "Dashboard", icon: Home, path: "/", role: ["admin", "doctor", "patient"] },
  { title: "Patient Registration", icon: Users, path: "/patients", role: ["admin"] },
  { title: "My Patients", icon: Users, path: "/my-patients", role: ["doctor"] },
  { title: "Coding & Documentation", icon: FileText, path: "/coding", role: ["admin"] },
  { title: "Charge Capture", icon: ClipboardList, path: "/charge-capture", role: ["admin", "doctor"] },
  { title: "Claims Submission", icon: Database, path: "/claims", role: ["admin"] },
  { title: "Insurance Follow-up", icon: Search, path: "/insurance-follow-up", role: ["admin"] },
  { title: "Patient Billing", icon: CreditCard, path: "/billing", role: ["admin", "patient"] },
  { title: "My Bills", icon: CreditCard, path: "/my-bills", role: ["patient"] },
  { title: "Denial Management", icon: AlertTriangle, path: "/denial-management", role: ["admin"] },
  { title: "Accounts Receivable", icon: Calendar, path: "/accounts-receivable", role: ["admin"] },
  { title: "Reports & Analytics", icon: BarChart2, path: "/reports", role: ["admin", "doctor"] },
  { title: "Insurance Verification", icon: UserCheck, path: "/insurance-verification", role: ["admin", "patient"] },
  { title: "Settings", icon: Settings, path: "/settings", role: ["admin"] },
];

interface NavigationMenuProps {
  collapsed: boolean;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ collapsed }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  // Filter navigation items based on user role
  const filteredItems = navigationItems.filter((item) => item.role.includes(user.role));

  return (
    <nav className="space-y-1">
      {filteredItems.map((item) => {
        const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon size={20} />
            {!collapsed && <span className="text-sm">{item.title}</span>}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavigationMenu;
