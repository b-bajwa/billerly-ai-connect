
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, Plus } from "lucide-react";

// Demo charge data
const chargeData = [
  {
    id: "CHG-1001",
    patientId: "P-10001",
    patientName: "Sarah Johnson",
    serviceDate: "04/28/2025",
    provider: "Dr. Robert Chen",
    cptCodes: [
      { code: "99213", description: "Office visit, est. patient", fee: 95.00 },
      { code: "85025", description: "CBC with differential", fee: 45.00 }
    ],
    totalCharge: 140.00,
    status: "ready to bill",
  },
  {
    id: "CHG-1002",
    patientId: "P-10002",
    patientName: "Michael Rodriguez",
    serviceDate: "04/15/2025",
    provider: "Dr. Lisa Wong",
    cptCodes: [
      { code: "99214", description: "Office visit, est. patient, moderate", fee: 130.00 },
      { code: "93000", description: "Electrocardiogram", fee: 75.00 }
    ],
    totalCharge: 205.00,
    status: "submitted",
  },
  {
    id: "CHG-1003",
    patientId: "P-10003",
    patientName: "Emma Thompson",
    serviceDate: "03/30/2025",
    provider: "Dr. James Smith",
    cptCodes: [
      { code: "99203", description: "Office visit, new patient", fee: 150.00 },
      { code: "71046", description: "Chest X-ray", fee: 200.00 }
    ],
    totalCharge: 350.00,
    status: "draft",
  },
  {
    id: "CHG-1004",
    patientId: "P-10004",
    patientName: "James Wilson",
    serviceDate: "01/05/2025",
    provider: "Dr. Maria Rivera",
    cptCodes: [
      { code: "99215", description: "Office visit, est. patient, high", fee: 175.00 },
      { code: "20610", description: "Joint injection", fee: 125.00 }
    ],
    totalCharge: 300.00,
    status: "submitted",
  },
  {
    id: "CHG-1005",
    patientId: "P-10005",
    patientName: "Olivia Garcia",
    serviceDate: "04/22/2025",
    provider: "Dr. Robert Chen",
    cptCodes: [
      { code: "99212", description: "Office visit, est. patient, straightforward", fee: 75.00 }
    ],
    totalCharge: 75.00,
    status: "ready to bill",
  }
];

const ChargeCapture: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCharges = chargeData.filter(charge => 
    charge.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    charge.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    charge.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready to bill": return "bg-green-100 text-green-800";
      case "submitted": return "bg-blue-100 text-blue-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  // Calculate summary statistics
  const readyToBill = chargeData.filter(c => c.status === "ready to bill").length;
  const submitted = chargeData.filter(c => c.status === "submitted").length;
  const draft = chargeData.filter(c => c.status === "draft").length;
  const totalCharges = chargeData.reduce((sum, charge) => sum + charge.totalCharge, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Charge Capture</h1>
          <p className="text-muted-foreground">Record and manage billable services</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>New Charge</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Charges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCharges.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              For {chargeData.length} service records
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ready to Bill</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{readyToBill}</div>
            <p className="text-xs text-muted-foreground">
              Charges ready for submission
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{submitted}</div>
            <p className="text-xs text-muted-foreground">
              Charges sent to billing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{draft}</div>
            <p className="text-xs text-muted-foreground">
              Charges pending completion
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Service Charges</CardTitle>
            <div className="flex items-center w-64">
              <Search className="w-4 h-4 mr-2 text-muted-foreground" />
              <Input
                placeholder="Search charges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <CardDescription>
            Track and manage billable services and procedures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Charge ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Service Date</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>CPT Codes</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCharges.map((charge) => (
                <TableRow key={charge.id}>
                  <TableCell className="font-medium">{charge.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{charge.patientName}</span>
                      <span className="text-xs text-gray-500">{charge.patientId}</span>
                    </div>
                  </TableCell>
                  <TableCell>{charge.serviceDate}</TableCell>
                  <TableCell>{charge.provider}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      {charge.cptCodes.map(cpt => (
                        <div key={cpt.code} className="flex items-center gap-2">
                          <span className="font-mono text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                            {cpt.code}
                          </span>
                          <span className="text-xs text-gray-600 truncate max-w-[150px]">
                            {cpt.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${charge.totalCharge.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={getStatusColor(charge.status)}
                    >
                      {charge.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline">Edit</Button>
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

export default ChargeCapture;
