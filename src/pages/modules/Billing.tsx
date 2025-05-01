
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { Receipt } from "lucide-react";

// Demo billing data
const demoBillings = [
  {
    id: "INV-2025-001",
    patientId: "P-10001",
    patientName: "Sarah Johnson",
    issueDate: "05/01/2025",
    dueDate: "05/15/2025",
    totalAmount: 145.75,
    patientResponsibility: 145.75,
    insuranceResponsibility: 0,
    status: "unpaid"
  },
  {
    id: "INV-2025-002",
    patientId: "P-10002",
    patientName: "Michael Rodriguez",
    issueDate: "04/16/2025",
    dueDate: "04/30/2025",
    totalAmount: 560.25,
    patientResponsibility: 75.00,
    insuranceResponsibility: 485.25,
    status: "partially paid",
    payments: [
      { date: "04/20/2025", amount: 75.00, method: "Credit Card" }
    ]
  },
  {
    id: "INV-2025-003",
    patientId: "P-10003",
    patientName: "Emma Thompson",
    issueDate: "03/31/2025",
    dueDate: "04/14/2025",
    totalAmount: 325.50,
    patientResponsibility: 65.00,
    insuranceResponsibility: 260.50,
    status: "overdue"
  },
  {
    id: "INV-2025-004",
    patientId: "P-10004",
    patientName: "James Wilson",
    issueDate: "01/07/2025",
    dueDate: "01/21/2025",
    totalAmount: 75.25,
    patientResponsibility: 75.25,
    insuranceResponsibility: 0,
    status: "paid",
    payments: [
      { date: "01/10/2025", amount: 75.25, method: "Bank Transfer" }
    ]
  }
];

// Chart data
const paymentMethodData = [
  { name: 'Credit Card', value: 64, fill: '#4f46e5' },
  { name: 'Bank Transfer', value: 21, fill: '#06b6d4' },
  { name: 'Cash', value: 8, fill: '#10b981' },
  { name: 'Check', value: 7, fill: '#f59e0b' }
];

const paymentStatusData = [
  { name: 'Jan', paid: 14235, unpaid: 5230 },
  { name: 'Feb', paid: 16890, unpaid: 4980 },
  { name: 'Mar', paid: 18670, unpaid: 6320 },
  { name: 'Apr', paid: 17540, unpaid: 5820 }
];

const Billing: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "partially paid": return "bg-blue-100 text-blue-800";
      case "unpaid": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Patient Billing</h1>
          <p className="text-muted-foreground">Manage patient statements and payments</p>
        </div>
        <Button className="flex items-center gap-2">
          <Receipt size={16} />
          <span>Generate Statements</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">$27,842.50</div>
            <p className="text-sm text-muted-foreground">Across 143 statements</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Collected (30 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">$32,175.45</div>
            <p className="text-sm text-muted-foreground">↑ 8.2% from previous period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Avg. Days to Pay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">16.3</div>
            <p className="text-sm text-muted-foreground">↓ 2.1 days from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Collection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92.7%</div>
            <p className="text-sm text-muted-foreground">↑ 1.5% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution by payment type</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Status Trends</CardTitle>
            <CardDescription>Last 4 months</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={paymentStatusData}
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
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                  <Bar dataKey="paid" name="Paid" fill="#10b981" />
                  <Bar dataKey="unpaid" name="Unpaid" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Statements</CardTitle>
          <CardDescription>
            Manage and track patient billing statements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Patient Resp.</TableHead>
                <TableHead>Insurance Resp.</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoBillings.map((billing) => (
                <TableRow key={billing.id}>
                  <TableCell className="font-medium">{billing.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{billing.patientName}</span>
                      <span className="text-xs text-gray-500">{billing.patientId}</span>
                    </div>
                  </TableCell>
                  <TableCell>{billing.issueDate}</TableCell>
                  <TableCell>{billing.dueDate}</TableCell>
                  <TableCell>${billing.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>${billing.patientResponsibility.toFixed(2)}</TableCell>
                  <TableCell>${billing.insuranceResponsibility.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={getStatusColor(billing.status)}
                    >
                      {billing.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      {billing.status !== "paid" && (
                        <Button size="sm" variant="outline">Record Payment</Button>
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

export default Billing;
