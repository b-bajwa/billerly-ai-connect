
import React from "react";
import ModuleCard from "@/components/dashboard/ModuleCard";
import { Users, ClipboardList, Database, BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DoctorDashboard: React.FC = () => {
  // Mock stats for demo
  const stats = [
    { title: "My Patients", value: "142", change: "+5%" },
    { title: "Claims Submitted", value: "28", change: "+3%" },
    { title: "Pending Charges", value: "7", change: "+2" },
    { title: "Denied Claims", value: "3", change: "-1" },
  ];

  // Module definitions for doctors
  const modules = [
    {
      title: "My Patients",
      description: "View and manage your registered patients",
      icon: <Users size={20} />,
      path: "/my-patients",
      implemented: true,
    },
    {
      title: "Charge Capture",
      description: "Input and review service charges",
      icon: <ClipboardList size={20} />,
      path: "/charge-capture",
      implemented: true,
    },
    {
      title: "Claims Status",
      description: "Track the status of patient claims",
      icon: <Database size={20} />,
      path: "/claims",
      implemented: true,
    },
    {
      title: "Reports",
      description: "View billing reports and analytics",
      icon: <BarChart2 size={20} />,
      path: "/reports",
      implemented: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Doctor Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your Billerly.AI dashboard. Manage your patients and billing here.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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
                <div className={`text-sm ${
                  typeof stat.change === 'string' && stat.change.startsWith('+') 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modules Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

export default DoctorDashboard;
