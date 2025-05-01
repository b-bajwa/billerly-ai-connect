
import React from "react";
import ModuleCard from "@/components/dashboard/ModuleCard";
import { CreditCard, FileText, AlertTriangle, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const PatientDashboard: React.FC = () => {
  // Mock billing overview for demo
  const billingOverview = {
    total: 1250.00,
    paid: 750.00,
    pending: 450.00,
    overdue: 50.00,
  };

  // Calculate progress percentage
  const paidPercentage = (billingOverview.paid / billingOverview.total) * 100;

  // Module definitions for patients
  const modules = [
    {
      title: "My Bills",
      description: "View and pay your medical bills",
      icon: <CreditCard size={20} />,
      path: "/my-bills",
      implemented: true,
    },
    {
      title: "Insurance Information",
      description: "Update and manage your insurance details",
      icon: <UserCheck size={20} />,
      path: "/insurance-verification",
      implemented: true,
    },
    {
      title: "Claim Status",
      description: "Track your submitted insurance claims",
      icon: <FileText size={20} />,
      path: "/claims",
      implemented: true,
    },
    {
      title: "Appeal Claims",
      description: "Appeal rejected insurance claims",
      icon: <AlertTriangle size={20} />,
      path: "/appeal-claims",
      implemented: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Patient Portal</h1>
        <p className="text-muted-foreground">
          Welcome to your Billerly.AI patient portal. Manage your bills and insurance information here.
        </p>
      </div>

      {/* Billing Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Billing Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Total Balance</span>
            <span className="font-bold text-xl">${billingOverview.total.toFixed(2)}</span>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Payment Progress</span>
              <span>{paidPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={paidPercentage} className="h-2" />
          </div>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center p-3 bg-green-50 rounded-md">
              <div className="text-green-600 font-semibold">${billingOverview.paid.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Paid</div>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-md">
              <div className="text-amber-600 font-semibold">${billingOverview.pending.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-md">
              <div className="text-red-600 font-semibold">${billingOverview.overdue.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Overdue</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
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

export default PatientDashboard;
