
import React from "react";
import ModuleCard from "@/components/dashboard/ModuleCard";
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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard: React.FC = () => {
  // Mock stats for demo
  const stats = [
    { title: "Total Patients", value: "2,458", change: "+12%" },
    { title: "Claims Submitted", value: "856", change: "+5%" },
    { title: "Active Claims", value: "342", change: "-3%" },
    { title: "Avg. Claim Value", value: "$1,245", change: "+8%" },
    { title: "Denial Rate", value: "8.2%", change: "-2%" },
    { title: "Net Collections", value: "$452K", change: "+15%" },
  ];

  // Module definitions for admin
  const modules = [
    {
      title: "Patient Registration",
      description: "Register new patients and verify insurance details",
      icon: <Users size={20} />,
      path: "/patients",
      implemented: true,
    },
    {
      title: "Coding & Documentation",
      description: "Manage ICD-10, CPT, and HCPCS codes",
      icon: <FileText size={20} />,
      path: "/coding",
      implemented: true,
    },
    {
      title: "Charge Capture",
      description: "Track and record all billable services",
      icon: <ClipboardList size={20} />,
      path: "/charge-capture",
      implemented: false,
    },
    {
      title: "Claims Submission",
      description: "Submit and monitor insurance claims",
      icon: <Database size={20} />,
      path: "/claims",
      implemented: true,
    },
    {
      title: "Insurance Follow-up",
      description: "Track and resolve outstanding claims",
      icon: <Search size={20} />,
      path: "/insurance-follow-up",
      implemented: false,
    },
    {
      title: "Patient Billing",
      description: "Generate and send patient statements",
      icon: <CreditCard size={20} />,
      path: "/billing",
      implemented: true,
    },
    {
      title: "Denial Management",
      description: "Identify trends and manage claim denials",
      icon: <AlertTriangle size={20} />,
      path: "/denial-management",
      implemented: false,
    },
    {
      title: "Accounts Receivable",
      description: "Monitor aging reports and payments",
      icon: <Calendar size={20} />,
      path: "/accounts-receivable",
      implemented: false,
    },
    {
      title: "Reports & Analytics",
      description: "Generate financial reports and insights",
      icon: <BarChart2 size={20} />,
      path: "/reports",
      implemented: true,
    },
    {
      title: "Insurance Verification",
      description: "Verify patient eligibility and benefits",
      icon: <UserCheck size={20} />,
      path: "/insurance-verification",
      implemented: true,
    },
    {
      title: "Settings",
      description: "Configure system settings and preferences",
      icon: <Settings size={20} />,
      path: "/settings",
      implemented: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to Billerly.AI. Manage all your healthcare billing operations from here.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modules Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Application Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => (
            <ModuleCard
              key={module.title}
              title={module.title}
              description={module.description}
              icon={module.icon}
              path={module.path}
              implemented={module.implemented}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
