
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Database, Users, Calendar, FileText } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("admin");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password, role);
      toast({
        title: "Login successful",
        description: `Welcome to Billerly.AI!`,
        variant: "default",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-billerly-extralight to-white p-4">
      <div className="max-w-md w-full animate-fadeIn">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold billerly-gradient-text mb-2">Billerly.AI</h1>
          <p className="text-gray-600">Intelligent Healthcare Billing Management</p>
        </div>

        <Card className="shadow-lg border-gray-100">
          <CardHeader>
            <CardTitle>Sign in to Billerly.AI</CardTitle>
            <CardDescription>
              Enter your credentials below to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="admin" className="mb-4" onValueChange={(value) => setRole(value as UserRole)}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span>Admin</span>
                </TabsTrigger>
                <TabsTrigger value="doctor" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Doctor</span>
                </TabsTrigger>
                <TabsTrigger value="patient" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Patient</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="admin">
                <p className="text-sm text-muted-foreground mb-4">
                  Access all billing modules, manage users, and view financial reports.
                </p>
              </TabsContent>
              <TabsContent value="doctor">
                <p className="text-sm text-muted-foreground mb-4">
                  View patient records, input service charges, and monitor claim status.
                </p>
              </TabsContent>
              <TabsContent value="patient">
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your personal and insurance details, view bills, and track claims.
                </p>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={`${role}@billerly.ai`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Demo: Use {role}@billerly.ai for {role} access
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Demo: Any password will work
                </p>
              </div>
              <Button type="submit" className="w-full billerly-gradient" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-xs text-center text-gray-500">
              Billerly.AI - Comprehensive Healthcare Billing Management
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
