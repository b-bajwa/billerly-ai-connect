
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileCheck } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Demo claims data
const demoClaims = [
  {
    id: "CLM-2025-001",
    patientId: "P-10001",
    patientName: "Sarah Johnson",
    serviceDate: "04/28/2025",
    submissionDate: "04/29/2025",
    amount: 345.75,
    insurance: "Blue Cross Blue Shield",
    status: "paid",
    paymentDate: "05/10/2025",
    paidAmount: 345.75
  },
  {
    id: "CLM-2025-002",
    patientId: "P-10002",
    patientName: "Michael Rodriguez",
    serviceDate: "04/15/2025",
    submissionDate: "04/16/2025",
    amount: 560.25,
    insurance: "Aetna",
    status: "pending",
    paymentDate: "",
    paidAmount: 0
  },
  {
    id: "CLM-2025-003",
    patientId: "P-10003",
    patientName: "Emma Thompson",
    serviceDate: "03/30/2025",
    submissionDate: "03/31/2025",
    amount: 825.50,
    insurance: "UnitedHealthcare",
    status: "denied",
    paymentDate: "",
    paidAmount: 0,
    denialReason: "Medical necessity not established"
  },
  {
    id: "CLM-2025-004",
    patientId: "P-10004",
    patientName: "James Wilson",
    serviceDate: "01/05/2025",
    submissionDate: "01/06/2025",
    amount: 275.25,
    insurance: "Medicare",
    status: "partially paid",
    paymentDate: "01/20/2025",
    paidAmount: 195.75,
    adjustmentReason: "Patient responsibility per Medicare guidelines"
  }
];

// Chart data
const claimsByStatusData = [
  { name: 'Paid', value: 187, fill: '#4ade80' },
  { name: 'Pending', value: 62, fill: '#facc15' },
  { name: 'Denied', value: 23, fill: '#f87171' },
  { name: 'Partially Paid', value: 35, fill: '#60a5fa' }
];

const Claims: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "denied": return "bg-red-100 text-red-800";
      case "partially paid": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Claims Submission</h1>
          <p className="text-muted-foreground">Manage and track insurance claims</p>
        </div>
        <Button className="flex items-center gap-2">
          <FileCheck size={16} />
          <span>New Claim</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Claims by Status</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={claimsByStatusData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Claims Summary</CardTitle>
            <CardDescription>Monthly overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 text-sm font-medium">Total Claims</div>
                  <div className="text-2xl font-bold">307</div>
                  <div className="text-green-600 text-sm">↑ 12% from last month</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 text-sm font-medium">Total Value</div>
                  <div className="text-2xl font-bold">$157,432</div>
                  <div className="text-blue-600 text-sm">↑ 8% from last month</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-yellow-600 text-sm font-medium">Avg. Processing Time</div>
                  <div className="text-2xl font-bold">14.3 days</div>
                  <div className="text-yellow-600 text-sm">↓ 2.1 days from last month</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-red-600 text-sm font-medium">Denial Rate</div>
                  <div className="text-2xl font-bold">7.5%</div>
                  <div className="text-red-600 text-sm">↓ 1.2% from last month</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Claims</CardTitle>
          <CardDescription>
            Track and manage submitted insurance claims
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Service Date</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell className="font-medium">{claim.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{claim.patientName}</span>
                      <span className="text-xs text-gray-500">{claim.patientId}</span>
                    </div>
                  </TableCell>
                  <TableCell>{claim.serviceDate}</TableCell>
                  <TableCell>{claim.insurance}</TableCell>
                  <TableCell>${claim.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={getStatusColor(claim.status)}
                    >
                      {claim.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {claim.status === "paid" ? 
                      <span className="text-green-600 font-medium">${claim.paidAmount.toFixed(2)}</span> : 
                      claim.status === "partially paid" ?
                      <span className="text-blue-600 font-medium">${claim.paidAmount.toFixed(2)}</span> :
                      <span className="text-gray-500">-</span>
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      {claim.status === "denied" && (
                        <Button size="sm" variant="outline">Appeal</Button>
                      )}
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

export default Claims;
