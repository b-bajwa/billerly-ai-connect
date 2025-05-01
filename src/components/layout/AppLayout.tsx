
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, Navigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import NavigationMenu from "./NavigationMenu";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="animate-pulse text-billerly-primary text-2xl">
          Loading Billerly.AI...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex h-screen w-full bg-muted/40">
      <div className={`${sidebarOpen ? "md:w-64 w-full" : "w-20"} transition-all duration-300 relative z-20`}>
        <Sidebar className="border-r h-full">
          <SidebarHeader className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {sidebarOpen ? (
                <h2 className="text-xl font-bold billerly-gradient-text">Billerly.AI</h2>
              ) : (
                <span className="font-bold text-xl text-billerly-primary">B</span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto hidden md:flex"
            >
              {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </Button>
          </SidebarHeader>
          <SidebarContent className="px-3 py-4">
            <NavigationMenu collapsed={!sidebarOpen} />
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-billerly-primary/20 overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-billerly-primary">
                    {user?.name.charAt(0)}
                  </div>
                )}
              </div>
              {sidebarOpen && (
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{user?.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                </div>
              )}
              <Button variant="ghost" size="icon" onClick={logout} className="ml-auto">
                <LogOut size={18} />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
      </div>

      <main className="flex-1 overflow-auto">
        <div className="flex md:hidden items-center p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={20} />
          </Button>
          <div className="mx-auto">
            <h2 className="text-xl font-bold billerly-gradient-text">Billerly.AI</h2>
          </div>
        </div>
        <div className="container mx-auto p-4 md:p-6 animate-fadeIn">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
