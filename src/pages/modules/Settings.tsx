
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Settings as SettingsIcon, UserCog, FileCheck, Database, Shield } from "lucide-react";

// Demo users data
const usersData = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@billerly.ai",
    role: "admin",
    status: "active",
    lastLogin: "05/06/2025, 09:15 AM"
  },
  {
    id: 2,
    name: "Dr. Robert Chen",
    email: "robert.chen@billerly.ai",
    role: "doctor",
    status: "active",
    lastLogin: "05/05/2025, 02:30 PM"
  },
  {
    id: 3,
    name: "Dr. Lisa Wong",
    email: "lisa.wong@billerly.ai",
    role: "doctor",
    status: "active",
    lastLogin: "05/06/2025, 08:45 AM"
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "patient1@example.com",
    role: "patient",
    status: "active",
    lastLogin: "05/01/2025, 11:20 AM"
  },
  {
    id: 5,
    name: "Michael Rodriguez",
    email: "patient2@example.com",
    role: "patient",
    status: "inactive",
    lastLogin: "04/15/2025, 04:05 PM"
  }
];

// Demo insurance data
const insuranceData = [
  {
    id: 1,
    name: "Blue Cross Blue Shield",
    phone: "800-555-1234",
    website: "bcbs.com",
    claimsEmail: "claims@bcbs.com",
    isInNetwork: true
  },
  {
    id: 2,
    name: "Aetna",
    phone: "800-555-2345",
    website: "aetna.com",
    claimsEmail: "claims@aetna.com",
    isInNetwork: true
  },
  {
    id: 3,
    name: "UnitedHealthcare",
    phone: "800-555-3456",
    website: "unitedhealthcare.com",
    claimsEmail: "claims@uhc.com",
    isInNetwork: true
  },
  {
    id: 4,
    name: "Medicare",
    phone: "800-555-4567",
    website: "medicare.gov",
    claimsEmail: "claims@medicare.gov",
    isInNetwork: true
  },
  {
    id: 5,
    name: "Cigna",
    phone: "800-555-5678",
    website: "cigna.com",
    claimsEmail: "claims@cigna.com",
    isInNetwork: false
  }
];

// Demo system settings
interface SystemSettings {
  practiceName: string;
  practiceAddress: string;
  practicePhone: string;
  practiceEmail: string;
  practiceNPI: string;
  practiceTaxID: string;
  defaultClaimFormat: string;
  autoSaveEnabled: boolean;
  notificationsEnabled: boolean;
  auditLogEnabled: boolean;
  reminderDays: string;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  
  const form = useForm<SystemSettings>({
    defaultValues: {
      practiceName: "Billerly Medical Center",
      practiceAddress: "123 Healthcare Ave, Medical City, CA 90210",
      practicePhone: "800-555-9876",
      practiceEmail: "info@billerly.ai",
      practiceNPI: "1234567890",
      practiceTaxID: "12-3456789",
      defaultClaimFormat: "X12 837P",
      autoSaveEnabled: true,
      notificationsEnabled: true,
      auditLogEnabled: true,
      reminderDays: "7"
    }
  });
  
  const saveSettings = (data: SystemSettings) => {
    console.log("Saving settings:", data);
    toast.success("Settings saved successfully!");
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-purple-100 text-purple-800";
      case "doctor": return "bg-blue-100 text-blue-800";
      case "patient": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure system and application preferences</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon size={16} />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <UserCog size={16} />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="insurance" className="flex items-center gap-2">
            <FileCheck size={16} />
            <span>Insurance</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Database size={16} />
            <span>Integrations</span>
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Practice Information</CardTitle>
              <CardDescription>
                Update your practice details used in claims and patient communications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(saveSettings)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="practiceName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Practice Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="practicePhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Practice Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="practiceEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Practice Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="practiceAddress"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Practice Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Practice Identifiers</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="practiceNPI"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NPI Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              National Provider Identifier
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="practiceTaxID"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tax ID / EIN</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              Used for tax reporting
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">System Preferences</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="defaultClaimFormat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Default Claim Format</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="reminderDays"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reminder Days</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                              Days before follow-up reminders
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="autoSaveEnabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Auto-Save
                              </FormLabel>
                              <FormDescription>
                                Automatically save form data
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="notificationsEnabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Notifications
                              </FormLabel>
                              <FormDescription>
                                Email alerts for important updates
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="auditLogEnabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Audit Logging
                              </FormLabel>
                              <FormDescription>
                                Track all user activity
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Settings</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage users and their permissions</CardDescription>
              </div>
              <Button>Add User</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={getRoleColor(user.role)}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={getStatusColor(user.status)}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Reset Password</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Insurance Tab */}
        <TabsContent value="insurance">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Insurance Providers</CardTitle>
                <CardDescription>Manage payer information and contact details</CardDescription>
              </div>
              <Button>Add Provider</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Claims Email</TableHead>
                    <TableHead>Network Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {insuranceData.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell className="font-medium">{provider.name}</TableCell>
                      <TableCell>{provider.phone}</TableCell>
                      <TableCell>{provider.website}</TableCell>
                      <TableCell>{provider.claimsEmail}</TableCell>
                      <TableCell>
                        {provider.isInNetwork ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            In-Network
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            Out-of-Network
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>API Integrations</CardTitle>
              <CardDescription>
                Configure third-party integrations and API connections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-md">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Electronic Health Record (EHR) System</h3>
                      <p className="text-sm text-muted-foreground">Connected to MediChart EHR</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Connected
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">API Endpoint</label>
                    <Input value="https://api.medichart.example/v1" readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium">API Key</label>
                    <Input value="••••••••••••••••" type="password" readOnly />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">Edit Connection</Button>
                    <Button variant="destructive">Disconnect</Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-purple-100 rounded-md">
                      <Shield className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Insurance Eligibility Verification</h3>
                      <p className="text-sm text-muted-foreground">Connected to EligibilityCheck API</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Connected
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">API Endpoint</label>
                    <Input value="https://api.eligibilitycheck.example/v2" readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium">API Key</label>
                    <Input value="••••••••••••••••" type="password" readOnly />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">Edit Connection</Button>
                    <Button variant="destructive">Disconnect</Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-6 border-dashed">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-md">
                      <Shield className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Payment Processing</h3>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">
                    Disconnected
                  </Badge>
                </div>
                <div className="py-8 flex flex-col items-center justify-center">
                  <p className="text-muted-foreground text-center mb-4">
                    Connect to a payment processor to enable online patient payments
                  </p>
                  <Button>Connect Payment Processor</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
