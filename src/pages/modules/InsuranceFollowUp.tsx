
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileCheck, Phone, AlertTriangle, Clock } from "lucide-react";

// Demo follow-up data
const followUpData = [
  {
    id: "FU-2025-001",
    claimId: "CLM-2025-001",
    patientName: "Sarah Johnson",
    patientId: "P-10001",
    insurance: "Blue Cross Blue Shield",
    submissionDate: "04/29/2025",
    daysOutstanding: 7,
    amount: 345.75,
    status: "pending",
    priority: "medium",
    notes: "Called on 05/02, claim in process. Follow up on 05/09 if not paid."
  },
  {
    id: "FU-2025-002",
    claimId: "CLM-2025-002",
    patientName: "Michael Rodriguez",
    patientId: "P-10002",
    insurance: "Aetna",
    submissionDate: "04/16/2025",
    daysOutstanding: 20,
    amount: 560.25,
    status: "delayed",
    priority: "high",
    notes: "Payer requesting additional documentation. Sent on 05/01, awaiting response."
  },
  {
    id: "FU-2025-003",
    claimId: "CLM-2025-003",
    patientName: "Emma Thompson",
    patientId: "P-10003",
    insurance: "UnitedHealthcare",
    submissionDate: "03/31/2025",
    daysOutstanding: 36,
    amount: 825.50,
    status: "denied",
    priority: "urgent",
    notes: "Denied for medical necessity. Appeal submitted on 04/15, awaiting review."
  },
  {
    id: "FU-2025-004",
    claimId: "CLM-2025-004",
    patientName: "James Wilson",
    patientId: "P-10004",
    insurance: "Medicare",
    submissionDate: "01/06/2025",
    daysOutstanding: 120,
    amount: 275.25,
    status: "partially paid",
    priority: "medium",
    notes: "Partial payment received. Following up on remaining balance."
  },
  {
    id: "FU-2025-005",
    claimId: "CLM-2025-005",
    patientName: "Olivia Garcia",
    patientId: "P-10005",
    insurance: "Cigna",
    submissionDate: "04/23/2025",
    daysOutstanding: 13,
    amount: 150.00,
    status: "pending",
    priority: "low",
    notes: "New claim, within standard processing time."
  }
];

const InsuranceFollowUp: React.FC = () => {
  // Calculate statistics
  const urgentCount = followUpData.filter(item => item.priority === "urgent").length;
  const highCount = followUpData.filter(item => item.priority === "high").length;
  const pendingAmount = followUpData
    .filter(item => item.status === "pending" || item.status === "delayed")
    .reduce((sum, item) => sum + item.amount, 0);
  const oldestClaim = Math.max(...followUpData.map(item => item.daysOutstanding));
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-blue-100 text-blue-800";
      case "delayed": return "bg-yellow-100 text-yellow-800";
      case "denied": return "bg-red-100 text-red-800";
      case "partially paid": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Insurance Follow-Up</h1>
          <p className="text-muted-foreground">Track and manage unpaid or problematic claims</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <FileCheck size={16} />
            <span>Export List</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Phone size={16} />
            <span>Log Call</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Total unresolved amount
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Urgent Follow-ups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{urgentCount}</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{highCount}</div>
            <p className="text-xs text-muted-foreground">
              Need attention this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Oldest Claim</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{oldestClaim} days</div>
            <p className="text-xs text-muted-foreground">
              Maximum days outstanding
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Claims Requiring Follow-up</CardTitle>
          <CardDescription>
            Track and resolve claims with insurance companies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Follow-up ID</TableHead>
                <TableHead>Patient / Claim</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead>Days Out</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {followUpData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{item.patientName}</span>
                      <span className="text-xs text-gray-500">{item.claimId}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.insurance}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1 text-gray-500" />
                      <span>{item.daysOutstanding} days</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${item.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={getStatusColor(item.status)}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={getPriorityColor(item.priority)}
                    >
                      {item.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Details</Button>
                      <Button size="sm" variant="outline">Follow-up</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Follow-up Notes</CardTitle>
          <CardDescription>
            Recent call logs and action items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {followUpData.map((item) => (
              <div key={`note-${item.id}`} className="flex p-4 border rounded-lg">
                <div className="mr-4">
                  {item.priority === "urgent" ? (
                    <AlertTriangle size={24} className="text-red-500" />
                  ) : (
                    <FileCheck size={24} className="text-blue-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold">{item.patientName}</h4>
                    <Badge variant="outline">{item.insurance}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceFollowUp;
