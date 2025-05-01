
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import AdminDashboard from "./dashboard/AdminDashboard";
import DoctorDashboard from "./dashboard/DoctorDashboard";
import PatientDashboard from "./dashboard/PatientDashboard";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Render the appropriate dashboard based on user role
  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "doctor":
      return <DoctorDashboard />;
    case "patient":
      return <PatientDashboard />;
    default:
      return <div>Unknown user role</div>;
  }
};

export default Dashboard;
