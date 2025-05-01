
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { Button } from "@/components/ui/button";
import { ChartBar, Download } from "lucide-react";

// Revenue by department
const revenueDeptData = [
  { name: 'Jan', Primary: 4000, Specialty: 2400, Diagnostic: 1800 },
  { name: 'Feb', Primary: 4500, Specialty: 2800, Diagnostic: 1600 },
  { name: 'Mar', Primary: 5000, Specialty: 3200, Diagnostic: 2100 },
  { name: 'Apr', Primary: 4800, Specialty: 3500, Diagnostic: 2300 },
  { name: 'May', Primary: 5200, Specialty: 3800, Diagnostic: 2500 }
];

// Claims trend
const claimsTrendData = [
  { name: 'W1', submitted: 43, paid: 35, denied: 4 },
  { name: 'W2', submitted: 52, paid: 40, denied: 8 },
  { name: 'W3', submitted: 48, paid: 42, denied: 5 },
  { name: 'W4', submitted: 61, paid: 50, denied: 7 }
];

// Financial metrics
const financialMetricsData = [
  { name: 'Jan', collections: 67500, expenses: 52000, net: 15500 },
  { name: 'Feb', collections: 72000, expenses: 53500, net: 18500 },
  { name: 'Mar', collections: 78500, expenses: 56000, net: 22500 },
  { name: 'Apr', collections: 82000, expenses: 57000, net: 25000 },
];

// Denial reasons
const denialReasonsData = [
  { name: 'Registration Error', value: 35, fill: '#f87171' },
  { name: 'Medical Necessity', value: 25, fill: '#fb923c' },
  { name: 'Coding Error', value: 20, fill: '#facc15' },
  { name: 'Prior Auth Missing', value: 15, fill: '#4ade80' },
  { name: 'Other', value: 5, fill: '#60a5fa' }
];

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Financial analysis and operational metrics</p>
        </div>
        <div className="flex gap-3">
          <Button className="flex items-center gap-2">
            <ChartBar size={16} />
            <span>Generate Report</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export Data</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Revenue YTD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$1,234,567</div>
            <p className="text-sm text-green-600">↑ 12.8% from last year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Avg. Days in AR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">28.5</div>
            <p className="text-sm text-green-600">↓ 3.2 days from last quarter</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Clean Claim Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">94.3%</div>
            <p className="text-sm text-green-600">↑ 2.1% from last quarter</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Collection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">96.7%</div>
            <p className="text-sm text-green-600">↑ 1.5% from last quarter</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Department</CardTitle>
            <CardDescription>Monthly comparison</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueDeptData}
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
                  <Bar dataKey="Primary" name="Primary Care" fill="#3b82f6" />
                  <Bar dataKey="Specialty" name="Specialty Care" fill="#10b981" />
                  <Bar dataKey="Diagnostic" name="Diagnostic Services" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Claims Processing Trends</CardTitle>
            <CardDescription>Weekly comparison (current month)</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={claimsTrendData}
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
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="submitted" 
                    name="Claims Submitted" 
                    stroke="#3b82f6" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="paid" 
                    name="Claims Paid" 
                    stroke="#10b981" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="denied" 
                    name="Claims Denied" 
                    stroke="#f87171" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Performance</CardTitle>
            <CardDescription>Collections vs. Expenses (YTD)</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={financialMetricsData}
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
                  <Bar dataKey="collections" name="Collections" fill="#3b82f6" />
                  <Bar dataKey="expenses" name="Expenses" fill="#f87171" />
                  <Line
                    type="monotone"
                    dataKey="net"
                    name="Net Income"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Denial Reasons</CardTitle>
            <CardDescription>Distribution by percentage</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={denialReasonsData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {denialReasonsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            Generate and download detailed reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Complete revenue and expenses breakdown with trend analysis
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">Generate</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Claims Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Detailed breakdown of claims by status, payer, and provider
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">Generate</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AR Aging Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Accounts receivable aging by payer and date ranges
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">Generate</Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
