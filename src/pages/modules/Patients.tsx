
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

// Demo patient data
const initialPatients = [
  {
    id: "P-10001",
    name: "Sarah Johnson",
    dob: "05/12/1985",
    insuranceProvider: "Blue Cross Blue Shield",
    policyNumber: "BCBS-76543210",
    status: "active",
    lastVisit: "04/28/2025",
    balance: 145.75
  },
  {
    id: "P-10002",
    name: "Michael Rodriguez",
    dob: "11/03/1978",
    insuranceProvider: "Aetna",
    policyNumber: "AET-98765432",
    status: "active",
    lastVisit: "04/15/2025",
    balance: 0
  },
  {
    id: "P-10003",
    name: "Emma Thompson",
    dob: "07/22/1992",
    insuranceProvider: "UnitedHealthcare",
    policyNumber: "UHC-12345678",
    status: "pending",
    lastVisit: "03/30/2025",
    balance: 325.50
  },
  {
    id: "P-10004",
    name: "James Wilson",
    dob: "02/14/1965",
    insuranceProvider: "Medicare",
    policyNumber: "MED-87654321",
    status: "inactive",
    lastVisit: "01/05/2025",
    balance: 75.25
  },
  {
    id: "P-10005",
    name: "Olivia Garcia",
    dob: "09/18/1997",
    insuranceProvider: "Cigna",
    policyNumber: "CIG-24681357",
    status: "active",
    lastVisit: "04/22/2025",
    balance: 50.00
  }
];

interface PatientFormValues {
  name: string;
  dob: string;
  insuranceProvider: string;
  policyNumber: string;
  status: string;
}

const Patients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState(initialPatients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const form = useForm<PatientFormValues>({
    defaultValues: {
      name: "",
      dob: "",
      insuranceProvider: "",
      policyNumber: "",
      status: "pending",
    }
  });

  const handleAddPatient = (data: PatientFormValues) => {
    const newPatient = {
      id: `P-${10000 + patients.length + 1}`,
      name: data.name,
      dob: data.dob,
      insuranceProvider: data.insuranceProvider,
      policyNumber: data.policyNumber,
      status: data.status,
      lastVisit: "N/A",
      balance: 0
    };
    
    setPatients([newPatient, ...patients]);
    setIsDialogOpen(false);
    form.reset();
    toast.success("New patient added successfully!");
  };
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.insuranceProvider.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Patient Registration</h1>
          <p className="text-muted-foreground">Manage patient information and registrations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus size={16} />
              <span>New Patient</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>
                Enter patient details to register them in the system.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddPatient)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter patient name" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/DD/YYYY" {...field} required />
                      </FormControl>
                      <FormDescription>Format: MM/DD/YYYY</FormDescription>
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
                        <Input placeholder="Enter insurance provider" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="policyNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Policy Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter policy number" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Add Patient</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Registered Patients</CardTitle>
            <div className="w-64">
              <Input 
                placeholder="Search patients..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>
            View and manage patient records and registration details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.dob}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{patient.insuranceProvider}</span>
                      <span className="text-xs text-gray-500">{patient.policyNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={getStatusColor(patient.status)}
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    {patient.balance === 0 ? 
                      <span className="text-green-600 font-medium">$0.00</span> : 
                      <span className="text-red-600 font-medium">${patient.balance.toFixed(2)}</span>
                    }
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
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredPatients.length} of {patients.length} patients
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Patients;
