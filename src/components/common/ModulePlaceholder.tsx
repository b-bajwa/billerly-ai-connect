
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ModulePlaceholderProps {
  title?: string;
  message?: string;
  isError?: boolean;
}

const ModulePlaceholder: React.FC<ModulePlaceholderProps> = ({
  title = "Sorry, nothing to show",
  message = "This section is under construction or has no available data at the moment. Please check back later.",
  isError = false,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleGoBack = () => {
    // Navigate back to the appropriate dashboard based on user role
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <div className={`p-4 rounded-full ${isError ? 'bg-red-100' : 'bg-amber-100'} mb-4`}>
        <AlertTriangle size={40} className={isError ? 'text-red-500' : 'text-amber-500'} />
      </div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-md mb-6">{message}</p>
      <Button onClick={handleGoBack} className="flex items-center gap-2">
        <Home size={16} />
        <span>Return to Dashboard</span>
      </Button>
    </div>
  );
};

export default ModulePlaceholder;
