
import React from "react";
import ModuleCard from "@/components/dashboard/ModuleCard";
import { Users, ClipboardList, Database, BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  
  // Demo recent patient visits
  const recentPatients = [
    {
      id: "PAT-10032",
      name: "Sarah Johnson",
      date: "05/06/2025",
      diagnosis: "Hypertension",
      status: "complete",
      medicalCodes: { 
        icdCodes: ["I10", "E11.9"], 
        cptCodes: ["99213", "85025"] 
      },
    },
    {
      id: "PAT-10045",
      name: "Michael Rodriguez",
      date: "05/05/2025",
      diagnosis: "Diabetes Type 2",
      status: "pending",
      medicalCodes: { 
        icdCodes: ["E11.9", "I10"], 
        cptCodes: ["99214"] 
      },
    },
    {
      id: "PAT-10078",
      name: "Emma Thompson",
      date: "05/04/2025",
      diagnosis: "Acute Bronchitis",
      status: "complete",
      medicalCodes: { 
        icdCodes: ["J20.9"], 
        cptCodes: ["99213", "94640"] 
      },
    },
    {
      id: "PAT-10093",
      name: "James Wilson",
      date: "05/03/2025",
      diagnosis: "Annual Check-up",
      status: "complete",
      medicalCodes: { 
        icdCodes: ["Z00.00"], 
        cptCodes: ["99395", "85025", "80061"] 
      },
    },
  ];
  
  const handleEditCodes = (patientId: string) => {
    console.log(`Edit codes for patient ${patientId}`);
    // In a real app, this would open a modal or navigate to an edit page
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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

      {/* Recent Patients */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Patient Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Visit Date</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Medical Codes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.date}</TableCell>
                  <TableCell>{patient.diagnosis}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-1">
                        {patient.medicalCodes.icdCodes.map((code) => (
                          <Badge key={code} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                            ICD: {code}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {patient.medicalCodes.cptCodes.map((code) => (
                          <Badge key={code} variant="outline" className="bg-green-50 text-green-600 border-green-200">
                            CPT: {code}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => handleEditCodes(patient.id)}>
                      Edit Codes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
