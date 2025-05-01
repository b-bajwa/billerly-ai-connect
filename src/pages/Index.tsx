
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated, otherwise to dashboard
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default Index;
