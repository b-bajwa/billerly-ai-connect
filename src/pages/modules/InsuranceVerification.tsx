
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ShieldCheck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";

// Demo verification data
const demoVerifications = [
  {
    id: "VER-10001",
    patientId: "P-10001",
    patientName: "Sarah Johnson",
    insuranceProvider: "Blue Cross Blue Shield",
    policyNumber: "BCBS-76543210",
    verifiedDate: "04/25/2025",
    status: "verified",
    coverage: {
      primary: true,
      effectiveDate: "01/01/2025",
      expirationDate: "12/31/2025",
      copay: "$25 Primary / $40 Specialist",
      deductible: "$1,500 Individual / $3,000 Family",
      deductibleMet: "$750 ($750 remaining)",
      outOfPocketMax: "$5,000 Individual / $10,000 Family",
      referralRequired: false,
      preAuthRequired: true
    }
  },
  {
    id: "VER-10002",
    patientId: "P-10002",
    patientName: "Michael Rodriguez",
    insuranceProvider: "Aetna",
    policyNumber: "AET-98765432",
    verifiedDate: "04/15/2025",
    status: "verified",
    coverage: {
      primary: true,
      effectiveDate: "03/01/2025",
      expirationDate: "02/28/2026",
      copay: "$30 Primary / $50 Specialist",
      deductible: "$2,000 Individual / $4,000 Family",
      deductibleMet: "$500 ($1,500 remaining)",
      outOfPocketMax: "$6,000 Individual / $12,000 Family",
      referralRequired: true,
      preAuthRequired: true
    }
  },
  {
    id: "VER-10003",
    patientId: "P-10003",
    patientName: "Emma Thompson",
    insuranceProvider: "UnitedHealthcare",
    policyNumber: "UHC-12345678",
    verifiedDate: "03/30/2025",
    status: "issue",
    notes: "Policy shows as inactive. Patient needs to contact insurance provider."
  },
  {
    id: "VER-10004",
    patientId: "P-10004",
    patientName: "James Wilson",
    insuranceProvider: "Medicare",
    policyNumber: "MED-87654321",
    verifiedDate: "01/05/2025",
    status: "verified",
    coverage: {
      primary: true,
      effectiveDate: "01/01/2025",
      expirationDate: "12/31/2025",
      copay: "20% Coinsurance after deductible",
      deductible: "$203 Annual",
      deductibleMet: "$203 (Met)",
      outOfPocketMax: "N/A",
      referralRequired: false,
      preAuthRequired: true
    }
  },
  {
    id: "VER-10005",
    patientId: "P-10005",
    patientName: "Olivia Garcia",
    insuranceProvider: "Cigna",
    policyNumber: "CIG-24681357",
    verifiedDate: "04/22/2025",
    status: "pending",
    notes: "Verification in progress. Awaiting response from Cigna."
  }
];

const InsuranceVerification: React.FC = () => {
  const form = useForm();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "issue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Insurance Verification</h1>
          <p className="text-muted-foreground">Verify patient eligibility and benefits</p>
        </div>
        <Button className="flex items-center gap-2">
          <ShieldCheck size={16} />
          <span>New Verification</span>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Verification</CardTitle>
          <CardDescription>Verify a patient's insurance status</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="patientInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Information</FormLabel>
                    <FormControl>
                      <Input placeholder="Patient ID or Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="insuranceProvider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance Provider</FormLabel>
                    <FormControl>
                      <Input placeholder="Provider Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="policyNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Policy / Member ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter ID" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="verificationType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Verification Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue="eligibility"
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="eligibility" id="eligibility" />
                          <label htmlFor="eligibility">Eligibility</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="benefits" id="benefits" />
                          <label htmlFor="benefits">Benefits</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="both" />
                          <label htmlFor="both">Both</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Office Visit, Surgery" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex items-end">
                <Button className="w-full">Verify Insurance</Button>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Verifications</CardTitle>
          <CardDescription>
            Track and manage patient insurance verifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead>Policy Number</TableHead>
                <TableHead>Verified Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoVerifications.map((ver) => (
                <TableRow key={ver.id}>
                  <TableCell className="font-medium">{ver.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{ver.patientName}</span>
                      <span className="text-xs text-gray-500">{ver.patientId}</span>
                    </div>
                  </TableCell>
                  <TableCell>{ver.insuranceProvider}</TableCell>
                  <TableCell>{ver.policyNumber}</TableCell>
                  <TableCell>{ver.verifiedDate}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={getStatusColor(ver.status)}
                    >
                      {ver.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline">Reverify</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Detailed coverage information for the first verification */}
      <Card>
        <CardHeader>
          <CardTitle>Coverage Details: {demoVerifications[0].patientName}</CardTitle>
          <CardDescription>
            Insurance verification record #{demoVerifications[0].id}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Plan Type:</span>
                <span className="font-medium">PPO</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Effective Date:</span>
                <span className="font-medium">{demoVerifications[0].coverage.effectiveDate}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Expiration Date:</span>
                <span className="font-medium">{demoVerifications[0].coverage.expirationDate}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Primary Insurance:</span>
                <span className="font-medium">{demoVerifications[0].coverage.primary ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Copay:</span>
                <span className="font-medium">{demoVerifications[0].coverage.copay}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Deductible:</span>
                <span className="font-medium">{demoVerifications[0].coverage.deductible}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Deductible Met:</span>
                <span className="font-medium">{demoVerifications[0].coverage.deductibleMet}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Out-of-Pocket Max:</span>
                <span className="font-medium">{demoVerifications[0].coverage.outOfPocketMax}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Referral Required:</span>
                <span className="font-medium">{demoVerifications[0].coverage.referralRequired ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Pre-Authorization Required:</span>
                <span className="font-medium">{demoVerifications[0].coverage.preAuthRequired ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceVerification;
