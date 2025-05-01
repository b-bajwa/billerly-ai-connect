
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./components/layout/AppLayout";
import NotFound from "./pages/NotFound";

// Module pages
import ChargeCapture from "./pages/modules/ChargeCapture";
import InsuranceFollowUp from "./pages/modules/InsuranceFollowUp";
import DenialManagement from "./pages/modules/DenialManagement";
import AccountsReceivable from "./pages/modules/AccountsReceivable";
import Settings from "./pages/modules/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes that use AppLayout */}
            <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/charge-capture" element={<AppLayout><ChargeCapture /></AppLayout>} />
            <Route path="/insurance-follow-up" element={<AppLayout><InsuranceFollowUp /></AppLayout>} />
            <Route path="/denial-management" element={<AppLayout><DenialManagement /></AppLayout>} />
            <Route path="/accounts-receivable" element={<AppLayout><AccountsReceivable /></AppLayout>} />
            <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
