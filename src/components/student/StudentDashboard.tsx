import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Camera,
  Mic,
  Monitor,
  BookOpen,
  HelpCircle,
  LogOut,
} from "lucide-react";
import SystemCheckDialog from "./SystemCheckDialog";
import ExamRulesDialog from "./ExamRulesDialog";

interface StudentDashboardProps {
  studentName?: string;
  studentId?: string;
  onLogout?: () => void;
}

const StudentDashboard = ({
  studentName = "Jane Smith",
  studentId = "STU12345",
  onLogout = () => {},
}: StudentDashboardProps) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showSystemCheck, setShowSystemCheck] = useState(false);
  const [showExamRules, setShowExamRules] = useState(false);
  const [showStartExam, setShowStartExam] = useState(false);

  const upcomingExams = [
    {
      id: "exam1",
      name: "Advanced Mathematics",
      date: "2023-07-20",
      time: "10:00 AM",
      duration: "120 minutes",
      status: "scheduled",
      verificationRequired: true,
      verificationComplete: false,
    },
    {
      id: "exam2",
      name: "Computer Science 101",
      date: "2023-07-22",
      time: "2:00 PM",
      duration: "90 minutes",
      status: "ready",
      verificationRequired: true,
      verificationComplete: true,
    },
  ];

  const completedExams = [
    {
      id: "exam3",
      name: "Introduction to Biology",
      date: "2023-07-10",
      score: "85/100",
      grade: "B+",
      status: "passed",
      suspicionScore: "low",
    },
    {
      id: "exam4",
      name: "World History",
      date: "2023-07-05",
      score: "92/100",
      grade: "A-",
      status: "passed",
      suspicionScore: "low",
    },
  ];

  const warnings = [
    {
      id: "warn1",
      examName: "Introduction to Biology",
      date: "2023-07-10",
      type: "tab_switch",
      description: "Switched browser tab during exam",
      severity: "medium",
    },
  ];

  const handleStartExam = (examId: string) => {
    console.log(`Starting exam ${examId}`);
    setShowStartExam(true);
  };

  const handleCheckSystem = () => {
    setShowSystemCheck(true);
  };

  const handleViewExamRules = () => {
    setShowExamRules(true);
  };

  const getStatusBadge = (
    status: string,
    verificationRequired?: boolean,
    verificationComplete?: boolean,
  ) => {
    if (status === "scheduled") {
      if (verificationRequired && !verificationComplete) {
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 border-amber-300"
          >
            Verification Required
          </Badge>
        );
      }
      return (
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-800 border-blue-300"
        >
          Scheduled
        </Badge>
      );
    }
    if (status === "ready") {
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 border-green-300"
        >
          Ready to Start
        </Badge>
      );
    }
    if (status === "passed") {
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 border-green-300"
        >
          Passed
        </Badge>
      );
    }
    if (status === "failed") {
      return (
        <Badge
          variant="outline"
          className="bg-red-100 text-red-800 border-red-300"
        >
          Failed
        </Badge>
      );
    }
    return <Badge variant="outline">{status}</Badge>;
  };

  const getSuspicionBadge = (score: string) => {
    if (score === "low") {
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 border-green-300"
        >
          Low Suspicion
        </Badge>
      );
    }
    if (score === "medium") {
      return (
        <Badge
          variant="outline"
          className="bg-amber-100 text-amber-800 border-amber-300"
        >
          Medium Suspicion
        </Badge>
      );
    }
    if (score === "high") {
      return (
        <Badge
          variant="outline"
          className="bg-red-100 text-red-800 border-red-300"
        >
          High Suspicion
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-xl font-bold">AP</span>
            </div>
            <h1 className="text-xl font-bold">AI Proctoring Platform</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${studentId}`}
                />
                <AvatarFallback>
                  {studentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{studentName}</p>
                <p className="text-xs text-slate-300">
                  Student ID: {studentId}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Student Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your exams and view your progress
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button
            onClick={handleCheckSystem}
            className="flex items-center justify-center gap-2 h-24 bg-blue-600 hover:bg-blue-700"
          >
            <Monitor className="h-6 w-6" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">System Check</span>
              <span className="text-xs opacity-90">Verify your device</span>
            </div>
          </Button>

          <Button
            onClick={handleViewExamRules}
            className="flex items-center justify-center gap-2 h-24 bg-green-600 hover:bg-green-700"
          >
            <BookOpen className="h-6 w-6" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">Exam Rules</span>
              <span className="text-xs opacity-90">View guidelines</span>
            </div>
          </Button>

          <Button
            className="flex items-center justify-center gap-2 h-24 bg-amber-600 hover:bg-amber-700"
            onClick={() => window.open("#", "_blank")}
          >
            <HelpCircle className="h-6 w-6" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">Get Help</span>
              <span className="text-xs opacity-90">Contact support</span>
            </div>
          </Button>

          <Button
            className="flex items-center justify-center gap-2 h-24 bg-purple-600 hover:bg-purple-700"
            onClick={() => setActiveTab("completed")}
          >
            <CheckCircle className="h-6 w-6" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">View Results</span>
              <span className="text-xs opacity-90">Check your scores</span>
            </div>
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
            <TabsTrigger value="completed">Completed Exams</TabsTrigger>
            <TabsTrigger value="warnings">
              Warnings{" "}
              {warnings.length > 0 && (
                <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">
                  {warnings.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingExams.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">
                    No upcoming exams scheduled
                  </p>
                </CardContent>
              </Card>
            ) : (
              upcomingExams.map((exam) => (
                <Card key={exam.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{exam.name}</CardTitle>
                      {getStatusBadge(
                        exam.status,
                        exam.verificationRequired,
                        exam.verificationComplete,
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-slate-500" />
                        <span>{exam.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-slate-500" />
                        <span>
                          {exam.time} ({exam.duration})
                        </span>
                      </div>
                    </div>

                    {exam.verificationRequired &&
                      !exam.verificationComplete && (
                        <Alert className="mb-4 bg-amber-50 border-amber-200">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                          <AlertDescription className="text-amber-600">
                            Identity verification required before starting this
                            exam
                          </AlertDescription>
                        </Alert>
                      )}

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={handleViewExamRules}>
                        View Rules
                      </Button>
                      {exam.status === "ready" ? (
                        <Button onClick={() => handleStartExam(exam.id)}>
                          Start Exam
                        </Button>
                      ) : exam.verificationRequired &&
                        !exam.verificationComplete ? (
                        <Button onClick={handleCheckSystem}>
                          Complete Verification
                        </Button>
                      ) : (
                        <Button disabled>Not Available Yet</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedExams.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">
                    No completed exams yet
                  </p>
                </CardContent>
              </Card>
            ) : (
              completedExams.map((exam) => (
                <Card key={exam.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{exam.name}</CardTitle>
                      <div className="flex space-x-2">
                        {getSuspicionBadge(exam.suspicionScore)}
                        {getStatusBadge(exam.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-slate-500" />
                        <span>Completed: {exam.date}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Score: {exam.score}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Grade: {exam.grade}</span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="warnings" className="space-y-4">
            {warnings.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">No warnings received</p>
                </CardContent>
              </Card>
            ) : (
              warnings.map((warning) => (
                <Card key={warning.id} className="border-amber-200 bg-amber-50">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
                        Warning: {warning.examName}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-amber-100 text-amber-800 border-amber-300"
                      >
                        {warning.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-amber-800">{warning.description}</p>
                      <p className="text-sm text-amber-600 mt-1">
                        Date: {warning.date}
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        className="border-amber-300 text-amber-800 hover:bg-amber-100"
                      >
                        Acknowledge
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* System Check Dialog */}
      <SystemCheckDialog
        open={showSystemCheck}
        onClose={() => setShowSystemCheck(false)}
      />

      {/* Exam Rules Dialog */}
      <ExamRulesDialog
        open={showExamRules}
        onClose={() => setShowExamRules(false)}
      />

      {/* Start Exam Dialog */}
      <Dialog open={showStartExam} onOpenChange={setShowStartExam}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ready to Start Exam?</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">
              You are about to start <strong>Computer Science 101</strong>.
              Please ensure:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                <span>Your webcam is working properly</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                <span>Your microphone is enabled</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                <span>You have a stable internet connection</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                <span>You have read and understood the exam rules</span>
              </li>
            </ul>
            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-blue-800">
                Once started, you will have 90 minutes to complete this exam.
                The timer cannot be paused.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStartExam(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => (window.location.href = "/exam-in-progress")}
            >
              Start Exam Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentDashboard;
