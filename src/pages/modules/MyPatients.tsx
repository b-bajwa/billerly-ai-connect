
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search, Plus, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Demo patient data for doctors
const initialPatients = [
  {
    id: "P-10001",
    name: "Sarah Johnson",
    dob: "05/12/1985",
    age: 40,
    lastVisit: "05/01/2025",
    nextVisit: "08/01/2025",
    medicalConditions: ["Hypertension", "Diabetes Type 2"],
    status: "active",
    medicalCodes: { 
      icdCodes: ["I10", "E11.9"], 
      cptCodes: ["99213", "85025"] 
    },
    notes: "Patient is responding well to current treatment plan. Blood pressure has improved since last visit."
  },
  {
    id: "P-10002",
    name: "Michael Rodriguez",
    dob: "11/03/1978",
    age: 47,
    lastVisit: "04/15/2025",
    nextVisit: "07/15/2025",
    medicalConditions: ["Asthma", "Seasonal Allergies"],
    status: "active",
    medicalCodes: { 
      icdCodes: ["J45.909", "J30.2"], 
      cptCodes: ["99214", "94375"] 
    },
    notes: "Patient experiencing fewer asthma attacks. Adjusted medication dosage."
  },
  {
    id: "P-10003",
    name: "Emma Thompson",
    dob: "07/22/1992",
    age: 33,
    lastVisit: "03/30/2025",
    nextVisit: "06/30/2025",
    medicalConditions: ["Migraine", "Anxiety"],
    status: "pending",
    medicalCodes: { 
      icdCodes: ["G43.909", "F41.1"], 
      cptCodes: ["99213", "90833"] 
    },
    notes: "Patient reports increased frequency of migraines. Considering referral to neurologist."
  },
  {
    id: "P-10004",
    name: "James Wilson",
    dob: "02/14/1965",
    age: 60,
    lastVisit: "04/22/2025",
    nextVisit: "05/20/2025",
    medicalConditions: ["Hypertension", "High Cholesterol", "Arthritis"],
    status: "active",
    medicalCodes: { 
      icdCodes: ["I10", "E78.5", "M19.90"], 
      cptCodes: ["99214", "80061"] 
    },
    notes: "Patient needs followup for recent lab work. LDL levels remain elevated."
  },
  {
    id: "P-10005",
    name: "Olivia Garcia",
    dob: "09/18/1997",
    age: 28,
    lastVisit: "02/10/2025",
    nextVisit: "05/10/2025",
    medicalConditions: ["Pregnancy - 2nd trimester"],
    status: "active",
    medicalCodes: { 
      icdCodes: ["Z34.02"], 
      cptCodes: ["99214", "76801"] 
    },
    notes: "Routine pregnancy check-up. All vitals normal, fetal development on track."
  }
];

interface MedicalCodesFormValues {
  icdCodes: string;
  cptCodes: string;
}

interface NotesFormValues {
  notes: string;
}

interface AppointmentFormValues {
  date: Date | undefined;
  time: string;
  reason: string;
}

const MyPatients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isCodesDialogOpen, setIsCodesDialogOpen] = useState(false);
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  const codesForm = useForm<MedicalCodesFormValues>();
  const notesForm = useForm<NotesFormValues>();
  const appointmentForm = useForm<AppointmentFormValues>();
  
  const handleEditCodes = (patient: any) => {
    setSelectedPatient(patient);
    codesForm.reset({
      icdCodes: patient.medicalCodes.icdCodes.join(", "),
      cptCodes: patient.medicalCodes.cptCodes.join(", ")
    });
    setIsCodesDialogOpen(true);
  };
  
  const handleSaveCodes = (data: MedicalCodesFormValues) => {
    const updatedPatients = patients.map(p => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          medicalCodes: {
            icdCodes: data.icdCodes.split(",").map(code => code.trim()),
            cptCodes: data.cptCodes.split(",").map(code => code.trim())
          }
        };
      }
      return p;
    });
    
    setPatients(updatedPatients);
    setIsCodesDialogOpen(false);
    toast.success("Medical codes updated successfully");
  };
  
  const handleEditNotes = (patient: any) => {
    setSelectedPatient(patient);
    notesForm.reset({
      notes: patient.notes
    });
    setIsNotesDialogOpen(true);
  };
  
  const handleSaveNotes = (data: NotesFormValues) => {
    const updatedPatients = patients.map(p => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          notes: data.notes
        };
      }
      return p;
    });
    
    setPatients(updatedPatients);
    setIsNotesDialogOpen(false);
    toast.success("Patient notes updated successfully");
  };
  
  const handleScheduleAppointment = (patient: any) => {
    setSelectedPatient(patient);
    appointmentForm.reset({
      date: undefined,
      time: "09:00",
      reason: ""
    });
    setIsAppointmentDialogOpen(true);
  };
  
  const handleSaveAppointment = (data: AppointmentFormValues) => {
    if (!data.date) {
      toast.error("Please select a date for the appointment");
      return;
    }
    
    const formattedDate = format(data.date, "MM/dd/yyyy");
    const updatedPatients = patients.map(p => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          nextVisit: formattedDate
        };
      }
      return p;
    });
    
    setPatients(updatedPatients);
    setIsAppointmentDialogOpen(false);
    toast.success(`Appointment scheduled for ${selectedPatient.name} on ${formattedDate} at ${data.time}`);
  };
  
  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient);
    setIsViewDialogOpen(true);
  };
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.medicalConditions.some(condition => 
      condition.toLowerCase().includes(searchTerm.toLowerCase())
    )
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
      <div>
        <h1 className="text-3xl font-bold mb-2">My Patients</h1>
        <p className="text-muted-foreground">
          View and manage your patient records, medical codes, and upcoming appointments
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Patient List</CardTitle>
            <div className="w-64">
              <Input 
                placeholder="Search patients or conditions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={<Search className="h-4 w-4" />}
              />
            </div>
          </div>
          <CardDescription>
            Manage your registered patients and their medical information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Medical Conditions</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Next Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {patient.medicalConditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>{patient.nextVisit}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={getStatusColor(patient.status)}
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewPatient(patient)}>View</Button>
                      <Button size="sm" variant="outline" onClick={() => handleEditCodes(patient)}>Edit Codes</Button>
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
        </CardFooter>
      </Card>
      
      {/* Medical Codes Dialog */}
      <Dialog open={isCodesDialogOpen} onOpenChange={setIsCodesDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Medical Codes</DialogTitle>
            <DialogDescription>
              Edit ICD and CPT codes for {selectedPatient?.name}
            </DialogDescription>
          </DialogHeader>
          <Form {...codesForm}>
            <form onSubmit={codesForm.handleSubmit(handleSaveCodes)} className="space-y-4 py-4">
              <FormField
                control={codesForm.control}
                name="icdCodes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ICD Codes</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g. I10, E11.9" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={codesForm.control}
                name="cptCodes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPT Codes</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g. 99213, 85025" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Notes Dialog */}
      <Dialog open={isNotesDialogOpen} onOpenChange={setIsNotesDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Patient Notes</DialogTitle>
            <DialogDescription>
              Update medical notes for {selectedPatient?.name}
            </DialogDescription>
          </DialogHeader>
          <Form {...notesForm}>
            <form onSubmit={notesForm.handleSubmit(handleSaveNotes)} className="space-y-4 py-4">
              <FormField
                control={notesForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clinical Notes</FormLabel>
                    <FormControl>
                      <Textarea rows={6} placeholder="Enter patient notes" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save Notes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Appointment Dialog */}
      <Dialog open={isAppointmentDialogOpen} onOpenChange={setIsAppointmentDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Schedule Appointment</DialogTitle>
            <DialogDescription>
              Schedule a new appointment for {selectedPatient?.name}
            </DialogDescription>
          </DialogHeader>
          <Form {...appointmentForm}>
            <form onSubmit={appointmentForm.handleSubmit(handleSaveAppointment)} className="space-y-4 py-4">
              <FormField
                control={appointmentForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={appointmentForm.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={appointmentForm.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Visit</FormLabel>
                    <FormControl>
                      <Input placeholder="Follow-up, Annual physical, etc." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Schedule Appointment</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* View Patient Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
          </DialogHeader>
          
          {selectedPatient && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{selectedPatient.name}</h3>
                  <p className="text-muted-foreground">ID: {selectedPatient.id} • DOB: {selectedPatient.dob}</p>
                </div>
                <Badge 
                  variant="outline"
                  className={getStatusColor(selectedPatient.status)}
                >
                  {selectedPatient.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm">Medical Conditions</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <div className="flex flex-wrap gap-1">
                      {selectedPatient.medicalConditions.map((condition: string, index: number) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm">Medical Codes</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs text-muted-foreground">ICD Codes</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedPatient.medicalCodes.icdCodes.map((code: string, index: number) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                              {code}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">CPT Codes</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedPatient.medicalCodes.cptCodes.map((code: string, index: number) => (
                            <Badge key={index} variant="outline" className="bg-green-50 text-green-600 border-green-200">
                              {code}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm">Clinical Notes</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <p>{selectedPatient.notes}</p>
                </CardContent>
              </Card>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => handleEditNotes(selectedPatient)}>
                  Edit Notes
                </Button>
                <Button variant="outline" onClick={() => handleScheduleAppointment(selectedPatient)}>
                  Schedule Appointment
                </Button>
                <Button onClick={() => handleEditCodes(selectedPatient)}>
                  Edit Medical Codes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyPatients;
