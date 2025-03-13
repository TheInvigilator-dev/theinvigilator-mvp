import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  Users,
  BookOpen,
  Calculator,
  Save,
  Upload,
} from "lucide-react";

interface ExamCreationPanelProps {
  onExamCreated?: () => void;
}

const ExamCreationPanel = ({
  onExamCreated = () => {},
}: ExamCreationPanelProps) => {
  const [examName, setExamName] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [examDate, setExamDate] = useState<Date | undefined>(new Date());
  const [examDuration, setExamDuration] = useState("60");
  const [proctorType, setProctorType] = useState("ai");
  const [allowedResources, setAllowedResources] = useState<string[]>([]);
  const [maxAttempts, setMaxAttempts] = useState("1");
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResourceToggle = (resource: string) => {
    if (allowedResources.includes(resource)) {
      setAllowedResources(allowedResources.filter((r) => r !== resource));
    } else {
      setAllowedResources([...allowedResources, resource]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, you would send the exam data to your backend
    console.log({
      examName,
      examDescription,
      examDate,
      examDuration,
      proctorType,
      allowedResources,
      maxAttempts,
    });

    setIsSubmitting(false);
    onExamCreated();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="settings">Exam Settings</TabsTrigger>
          <TabsTrigger value="proctoring">Proctoring</TabsTrigger>
          <TabsTrigger value="publish">Review & Publish</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Exam Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="examName">Exam Name *</Label>
                <Input
                  id="examName"
                  placeholder="e.g. Advanced Mathematics Final Exam"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="examDescription">Exam Description</Label>
                <Textarea
                  id="examDescription"
                  placeholder="Provide a description of the exam..."
                  value={examDescription}
                  onChange={(e) => setExamDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Exam Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {examDate ? format(examDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={examDate}
                        onSelect={setExamDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="examDuration">Duration (minutes) *</Label>
                  <div className="flex items-center">
                    <Input
                      id="examDuration"
                      type="number"
                      min="1"
                      value={examDuration}
                      onChange={(e) => setExamDuration(e.target.value)}
                      className="mr-2"
                    />
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={() => setActiveTab("settings")}>
                  Next: Exam Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exam Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Allowed Resources</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="resource-book"
                      checked={allowedResources.includes("book")}
                      onCheckedChange={() => handleResourceToggle("book")}
                    />
                    <Label
                      htmlFor="resource-book"
                      className="flex items-center"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Open Book
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="resource-calculator"
                      checked={allowedResources.includes("calculator")}
                      onCheckedChange={() => handleResourceToggle("calculator")}
                    />
                    <Label
                      htmlFor="resource-calculator"
                      className="flex items-center"
                    >
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculator
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="resource-notes"
                      checked={allowedResources.includes("notes")}
                      onCheckedChange={() => handleResourceToggle("notes")}
                    />
                    <Label
                      htmlFor="resource-notes"
                      className="flex items-center"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Personal Notes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="resource-internet"
                      checked={allowedResources.includes("internet")}
                      onCheckedChange={() => handleResourceToggle("internet")}
                    />
                    <Label
                      htmlFor="resource-internet"
                      className="flex items-center"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      Internet Access
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAttempts">Maximum Attempts Allowed</Label>
                <Select value={maxAttempts} onValueChange={setMaxAttempts}>
                  <SelectTrigger id="maxAttempts">
                    <SelectValue placeholder="Select maximum attempts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 attempt only</SelectItem>
                    <SelectItem value="2">2 attempts</SelectItem>
                    <SelectItem value="3">3 attempts</SelectItem>
                    <SelectItem value="unlimited">
                      Unlimited attempts
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("basic")}>
                  Back
                </Button>
                <Button onClick={() => setActiveTab("proctoring")}>
                  Next: Proctoring Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proctoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Proctoring Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Proctoring Type</Label>
                <RadioGroup value={proctorType} onValueChange={setProctorType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ai" id="proctor-ai" />
                    <Label htmlFor="proctor-ai">AI Proctoring Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="live" id="proctor-live" />
                    <Label htmlFor="proctor-live">Live Proctor Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hybrid" id="proctor-hybrid" />
                    <Label htmlFor="proctor-hybrid">
                      Hybrid (AI + Live Proctor)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {(proctorType === "live" || proctorType === "hybrid") && (
                <div className="space-y-2">
                  <Label htmlFor="assignProctor">Assign Proctors</Label>
                  <Select>
                    <SelectTrigger id="assignProctor">
                      <SelectValue placeholder="Select proctors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="michael">Michael Brown</SelectItem>
                      <SelectItem value="emily">Emily Davis</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center mt-2">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      4 proctors available
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("settings")}
                >
                  Back
                </Button>
                <Button onClick={() => setActiveTab("publish")}>
                  Next: Review & Publish
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publish" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Review & Publish Exam</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-md">
                  <h3 className="font-semibold text-lg mb-2">
                    {examName || "[Exam Name]"}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {examDescription || "[No description provided]"}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Date:</p>
                      <p>{examDate ? format(examDate, "PPP") : "[Not set]"}</p>
                    </div>
                    <div>
                      <p className="font-medium">Duration:</p>
                      <p>{examDuration} minutes</p>
                    </div>
                    <div>
                      <p className="font-medium">Proctoring:</p>
                      <p>
                        {proctorType === "ai" && "AI Proctoring Only"}
                        {proctorType === "live" && "Live Proctor Only"}
                        {proctorType === "hybrid" &&
                          "Hybrid (AI + Live Proctor)"}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Max Attempts:</p>
                      <p>
                        {maxAttempts === "unlimited"
                          ? "Unlimited"
                          : maxAttempts}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-medium">Allowed Resources:</p>
                      <p>
                        {allowedResources.length === 0
                          ? "None"
                          : allowedResources
                              .map(
                                (r) => r.charAt(0).toUpperCase() + r.slice(1),
                              )
                              .join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="pt-4 flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("proctoring")}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Publishing..." : "Publish Exam"}
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamCreationPanel;
