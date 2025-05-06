
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FileText } from "lucide-react";

// Demo coding data
const initialCodingData = [
  {
    id: "DOC-1001",
    patientId: "P-10001",
    patientName: "Sarah Johnson",
    serviceDate: "04/28/2025",
    cptCodes: ["99213", "85025"],
    icdCodes: ["E11.9", "I10"],
    status: "complete",
    provider: "Dr. Robert Chen",
    notes: "Follow-up appointment for diabetes and hypertension"
  },
  {
    id: "DOC-1002",
    patientId: "P-10002",
    patientName: "Michael Rodriguez",
    serviceDate: "04/15/2025",
    cptCodes: ["99214", "93000"],
    icdCodes: ["I25.10", "I10", "E78.5"],
    status: "pending review",
    provider: "Dr. Lisa Wong",
    notes: "Annual physical with ECG for coronary artery disease monitoring"
  },
  {
    id: "DOC-1003",
    patientId: "P-10003",
    patientName: "Emma Thompson",
    serviceDate: "03/30/2025",
    cptCodes: ["99203", "71046"],
    icdCodes: ["J18.9"],
    status: "complete",
    provider: "Dr. James Smith",
    notes: "New patient visit for pneumonia evaluation, chest X-ray ordered"
  },
  {
    id: "DOC-1004",
    patientId: "P-10004",
    patientName: "James Wilson",
    serviceDate: "01/05/2025",
    cptCodes: ["99215", "20610"],
    icdCodes: ["M17.11", "M19.90"],
    status: "flagged",
    provider: "Dr. Maria Rivera",
    notes: "Knee joint injection for osteoarthritis, missing laterality information"
  }
];

interface DocFormValues {
  patientName: string;
  serviceDate: string;
  cptCodes: string;
  icdCodes: string;
  provider: string;
  notes: string;
  status: string;
}

const Coding: React.FC = () => {
  const [codingData, setCodingData] = useState(initialCodingData);
  const [selectedDoc, setSelectedDoc] = useState<typeof initialCodingData[0] | null>(null);
  const [dialogMode, setDialogMode] = useState<'view' | 'edit'>("view");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const form = useForm<DocFormValues>({
    defaultValues: {
      patientName: "",
      serviceDate: "",
      cptCodes: "",
      icdCodes: "",
      provider: "",
      notes: "",
      status: "",
    }
  });

  const handleViewDoc = (doc: typeof initialCodingData[0]) => {
    setSelectedDoc(doc);
    setDialogMode('view');
    setIsDialogOpen(true);
  };

  const handleEditDoc = (doc: typeof initialCodingData[0]) => {
    setSelectedDoc(doc);
    setDialogMode('edit');
    form.reset({
      patientName: doc.patientName,
      serviceDate: doc.serviceDate,
      cptCodes: doc.cptCodes.join(", "),
      icdCodes: doc.icdCodes.join(", "),
      provider: doc.provider,
      notes: doc.notes,
      status: doc.status,
    });
    setIsDialogOpen(true);
  };

  const handleSaveDoc = (data: DocFormValues) => {
    if (!selectedDoc) return;
    
    const updatedData = codingData.map(doc => {
      if (doc.id === selectedDoc.id) {
        return {
          ...doc,
          patientName: data.patientName,
          serviceDate: data.serviceDate,
          cptCodes: data.cptCodes.split(",").map(code => code.trim()),
          icdCodes: data.icdCodes.split(",").map(code => code.trim()),
          provider: data.provider,
          notes: data.notes,
          status: data.status,
        };
      }
      return doc;
    });
    
    setCodingData(updatedData);
    setIsDialogOpen(false);
    toast.success("Documentation updated successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete": return "bg-green-100 text-green-800";
      case "pending review": return "bg-yellow-100 text-yellow-800";
      case "flagged": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Coding & Documentation</h1>
          <p className="text-muted-foreground">Manage medical coding and clinical documentation</p>
        </div>
        <Button className="flex items-center gap-2">
          <FileText size={16} />
          <span>New Documentation</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Coding Activity</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Coded:</span>
                <span className="font-medium">87</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Awaiting Review:</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Flagged:</span>
                <span className="font-medium text-red-600">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Audit Rate:</span>
                <span className="font-medium text-green-600">96.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Common ICD-10 Codes</CardTitle>
            <CardDescription>Most frequently used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-mono">E11.9</span>
                <span className="text-muted-foreground">Type 2 Diabetes</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">I10</span>
                <span className="text-muted-foreground">Hypertension</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">J02.9</span>
                <span className="text-muted-foreground">Pharyngitis</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">M54.5</span>
                <span className="text-muted-foreground">Low Back Pain</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Common CPT Codes</CardTitle>
            <CardDescription>Most frequently used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-mono">99213</span>
                <span className="text-muted-foreground">Established Patient, Level 3</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">99214</span>
                <span className="text-muted-foreground">Established Patient, Level 4</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">80053</span>
                <span className="text-muted-foreground">Basic Metabolic Panel</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">85025</span>
                <span className="text-muted-foreground">CBC with Differential</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Documentation</CardTitle>
          <CardDescription>
            Review and manage patient encounter documentation and coding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Service Date</TableHead>
                <TableHead>CPT Codes</TableHead>
                <TableHead>ICD-10 Codes</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {codingData.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{doc.patientName}</span>
                      <span className="text-xs text-gray-500">{doc.patientId}</span>
                    </div>
                  </TableCell>
                  <TableCell>{doc.serviceDate}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {doc.cptCodes.map(code => (
                        <span key={code} className="inline-block px-2 py-1 text-xs font-mono bg-blue-100 text-blue-800 rounded">
                          {code}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {doc.icdCodes.map(code => (
                        <span key={code} className="inline-block px-2 py-1 text-xs font-mono bg-purple-100 text-purple-800 rounded">
                          {code}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{doc.provider}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={getStatusColor(doc.status)}
                    >
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewDoc(doc)}>View</Button>
                      <Button size="sm" variant="outline" onClick={() => handleEditDoc(doc)}>Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'view' ? 'View Documentation' : 'Edit Documentation'}
            </DialogTitle>
            <DialogDescription>
              {dialogMode === 'view' 
                ? `Viewing documentation details for ${selectedDoc?.patientName}`
                : `Edit documentation details for ${selectedDoc?.patientName}`}
            </DialogDescription>
          </DialogHeader>
          
          {dialogMode === 'view' && selectedDoc && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Patient</h4>
                  <p>{selectedDoc.patientName} ({selectedDoc.patientId})</p>
                </div>
                <div>
                  <h4 className="font-semibold">Service Date</h4>
                  <p>{selectedDoc.serviceDate}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">CPT Codes</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedDoc.cptCodes.map(code => (
                    <span key={code} className="inline-block px-2 py-1 text-xs font-mono bg-blue-100 text-blue-800 rounded">
                      {code}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold">ICD-10 Codes</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedDoc.icdCodes.map(code => (
                    <span key={code} className="inline-block px-2 py-1 text-xs font-mono bg-purple-100 text-purple-800 rounded">
                      {code}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Provider</h4>
                <p>{selectedDoc.provider}</p>
              </div>
              <div>
                <h4 className="font-semibold">Status</h4>
                <Badge 
                  variant="outline"
                  className={getStatusColor(selectedDoc.status)}
                >
                  {selectedDoc.status}
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold">Notes</h4>
                <p className="text-sm text-muted-foreground">{selectedDoc.notes}</p>
              </div>
              <DialogFooter>
                <Button onClick={() => handleEditDoc(selectedDoc)}>Edit</Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </div>
          )}
          
          {dialogMode === 'edit' && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSaveDoc)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="patientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Date</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cptCodes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPT Codes (comma separated)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="99213, 85025" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="icdCodes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ICD-10 Codes (comma separated)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="E11.9, I10" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="provider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provider</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Coding;
