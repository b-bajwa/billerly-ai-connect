
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FileX, FilePlus, AlertTriangle } from "lucide-react";

// Demo denial data
const denialData = [
  {
    id: "DNL-2025-001",
    claimId: "CLM-2025-003",
    patientName: "Emma Thompson",
    patientId: "P-10003", 
    insurance: "UnitedHealthcare",
    amount: 825.50,
    denialDate: "04/10/2025",
    reason: "Medical necessity not established",
    reasonCode: "50",
    status: "appeal submitted",
    appealDeadline: "07/10/2025",
    notes: "Submitted additional clinical documentation with appeal on 04/15"
  },
  {
    id: "DNL-2025-002",
    claimId: "CLM-2025-006",
    patientName: "David Martinez",
    patientId: "P-10006",
    insurance: "Blue Cross Blue Shield",
    amount: 450.00,
    denialDate: "04/05/2025",
    reason: "Service not covered under plan",
    reasonCode: "96",
    status: "appeal pending",
    appealDeadline: "07/05/2025",
    notes: "Verifying benefits with insurance representative"
  },
  {
    id: "DNL-2025-003",
    claimId: "CLM-2025-007",
    patientName: "Jennifer Baker",
    patientId: "P-10007",
    insurance: "Cigna",
    amount: 675.25,
    denialDate: "03/28/2025",
    reason: "Duplicate claim",
    reasonCode: "18",
    status: "resolved",
    appealDeadline: "06/28/2025",
    notes: "Confirmed duplicate submission. Original claim processed on 03/15"
  },
  {
    id: "DNL-2025-004",
    claimId: "CLM-2025-008",
    patientName: "Robert Taylor",
    patientId: "P-10008",
    insurance: "Medicare",
    amount: 325.50,
    denialDate: "03/20/2025",
    reason: "Missing or invalid modifier",
    reasonCode: "4",
    status: "corrected claim sent",
    appealDeadline: "06/20/2025",
    notes: "Added appropriate modifier and resubmitted on 03/25"
  },
  {
    id: "DNL-2025-005",
    claimId: "CLM-2025-009",
    patientName: "Lisa Anderson",
    patientId: "P-10009",
    insurance: "Aetna",
    amount: 950.75,
    denialDate: "03/15/2025",
    reason: "Prior authorization required",
    reasonCode: "38",
    status: "appeal rejected",
    appealDeadline: "06/15/2025",
    notes: "Authorization request was not submitted prior to service. Patient responsible."
  }
];

// Denial reason chart data
const denialReasonData = [
  { name: "Medical necessity", value: 32, fill: "#ef4444" },
  { name: "Prior authorization", value: 24, fill: "#f97316" },
  { name: "Non-covered service", value: 18, fill: "#eab308" },
  { name: "Coding error", value: 15, fill: "#22c55e" },
  { name: "Duplicate claim", value: 11, fill: "#3b82f6" }
];

const DenialManagement: React.FC = () => {
  // Calculate summary statistics
  const totalDeniedAmount = denialData.reduce((sum, denial) => sum + denial.amount, 0);
  const appealsSubmitted = denialData.filter(d => d.status === "appeal submitted").length;
  const appealsRejected = denialData.filter(d => d.status === "appeal rejected").length;
  const resolved = denialData.filter(d => d.status === "resolved").length;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "appeal submitted": return "bg-blue-100 text-blue-800";
      case "appeal pending": return "bg-yellow-100 text-yellow-800";
      case "corrected claim sent": return "bg-green-100 text-green-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "appeal rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Denial Management</h1>
          <p className="text-muted-foreground">Track and resolve denied insurance claims</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <FileX size={16} />
            <span>Export Denied Claims</span>
          </Button>
          <Button className="flex items-center gap-2">
            <FilePlus size={16} />
            <span>Submit Appeal</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Denied Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDeniedAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Total across {denialData.length} denied claims
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Appeals Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{appealsSubmitted}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review by payer
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Appeals Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{appealsRejected}</div>
            <p className="text-xs text-muted-foreground">
              Appeal process exhausted
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{resolved}</div>
            <p className="text-xs text-muted-foreground">
              Successfully appealed or corrected
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Denial Reasons</CardTitle>
            <CardDescription>Most common reasons for claim denials</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={denialReasonData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 25,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" name="Count" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Prevention Insights</CardTitle>
            <CardDescription>Recommendations to prevent future denials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 border rounded-md">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm">Medical Necessity Documentation</h4>
                  <p className="text-sm text-muted-foreground">
                    Include more detailed clinical notes and test results to support medical necessity. 32% of denials could be prevented with better documentation.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 border rounded-md">
                <AlertTriangle className="w-5 h-5 text-orange-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm">Prior Authorization Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    Establish a pre-service verification process to ensure all required authorizations are obtained before patient appointments.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 border rounded-md">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm">Coverage Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    Verify specific service coverage with insurance before scheduling procedures that commonly face coverage denials.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Denied Claims</CardTitle>
          <CardDescription>
            Track and manage claim denials and appeals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Denial ID</TableHead>
                <TableHead>Patient / Claim</TableHead>
                <TableHead>Denial Reason</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Appeal Deadline</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {denialData.map((denial) => (
                <TableRow key={denial.id}>
                  <TableCell className="font-medium">{denial.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{denial.patientName}</span>
                      <span className="text-xs text-gray-500">{denial.claimId}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{denial.reason}</span>
                      <span className="text-xs text-gray-500">Code: {denial.reasonCode}</span>
                    </div>
                  </TableCell>
                  <TableCell>{denial.insurance}</TableCell>
                  <TableCell className="font-medium">${denial.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={getStatusColor(denial.status)}
                    >
                      {denial.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{denial.appealDeadline}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline">Appeal</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DenialManagement;
