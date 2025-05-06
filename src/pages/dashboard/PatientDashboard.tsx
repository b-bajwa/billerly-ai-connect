
import React, { useState } from "react";
import ModuleCard from "@/components/dashboard/ModuleCard";
import { CreditCard, FileText, AlertTriangle, UserCheck, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const PatientDashboard: React.FC = () => {
  const [showInsuranceForm, setShowInsuranceForm] = useState(false);
  const form = useForm();
  
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
  
  // Demo bills data
  const myBills = [
    {
      id: "BILL-1001",
      date: "04/15/2025",
      provider: "Dr. Robert Chen",
      description: "Office visit + Blood work",
      amount: 145.75,
      insurance: "Pending",
      status: "unpaid"
    },
    {
      id: "BILL-1002",
      date: "03/22/2025",
      provider: "City Medical Center",
      description: "X-ray, right shoulder",
      amount: 320.00,
      insurance: "Covered (80%)",
      patientResponsibility: 64.00,
      status: "partially paid"
    },
    {
      id: "BILL-1003",
      date: "02/10/2025",
      provider: "Dr. Lisa Wong",
      description: "Annual physical",
      amount: 210.00,
      insurance: "Covered (100%)",
      patientResponsibility: 0,
      status: "paid"
    },
    {
      id: "BILL-1004",
      date: "01/05/2025",
      provider: "Medical Lab Partners",
      description: "Comprehensive blood panel",
      amount: 275.50,
      insurance: "Denied",
      status: "overdue"
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "partially paid": return "bg-blue-100 text-blue-800";
      case "unpaid": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const handleAddInsurance = (data: any) => {
    console.log("Adding insurance information:", data);
    setShowInsuranceForm(false);
    // In a real application, this would submit the data to a backend
  };

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
      
      {/* My Bills Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Bills</CardTitle>
          <Button size="sm" variant="outline">View All</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myBills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.id}</TableCell>
                  <TableCell>{bill.date}</TableCell>
                  <TableCell>{bill.provider}</TableCell>
                  <TableCell>{bill.description}</TableCell>
                  <TableCell>${bill.amount.toFixed(2)}</TableCell>
                  <TableCell>{bill.insurance}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(bill.status)}>
                      {bill.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Insurance Information Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Insurance Information</CardTitle>
            <CardContent className="p-0 pt-2">
              You can add and manage your insurance information here.
            </CardContent>
          </div>
          <Button onClick={() => setShowInsuranceForm(true)} className="flex items-center gap-2">
            <Plus size={16} />
            <span>Add Insurance</span>
          </Button>
        </CardHeader>
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
      
      {/* Insurance Form Dialog */}
      <Dialog open={showInsuranceForm} onOpenChange={setShowInsuranceForm}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add Insurance Information</DialogTitle>
            <DialogDescription>
              Enter your insurance details below. This information will be used for billing purposes.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddInsurance)} className="space-y-4">
              <FormField
                control={form.control}
                name="insuranceProvider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance Provider</FormLabel>
                    <FormControl>
                      <Input placeholder="BlueCross BlueShield, Aetna, etc." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="policyNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Policy Number</FormLabel>
                      <FormControl>
                        <Input placeholder="XXX-XXX-XXX" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="groupNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Optional" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="policyHolder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Policyholder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship to Policyholder</FormLabel>
                      <FormControl>
                        <Input placeholder="Self, Spouse, Child, etc." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="submit">Save Insurance Information</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientDashboard;
