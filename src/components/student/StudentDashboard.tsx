import React, { useState, useEffect } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Play,
  Shield,
  Trophy,
  Target,
  Zap,
  Star,
  TrendingUp,
  FileText,
  Settings,
  Bell,
  GraduationCap,
  Award,
  BarChart3,
  Timer,
  Eye,
  Users,
  MapPin,
  Wifi,
  Volume2,
  ArrowRight,
  ExternalLink,
  Download,
  RefreshCw
} from "lucide-react";
import SystemCheckDialog from "./SystemCheckDialog";
import ExamRulesDialog from "./ExamRulesDialog";

interface StudentDashboardProps {
  studentName?: string;
  studentId?: string;
  onLogout?: () => void;
}

const StudentDashboard = ({
  studentName = "Sarah Johnson",
  studentId = "STU78901",
  onLogout = () => { },
}: StudentDashboardProps) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showSystemCheck, setShowSystemCheck] = useState(false);
  const [showExamRules, setShowExamRules] = useState(false);
  const [showStartExam, setShowStartExam] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const upcomingExams = [
    {
      id: "exam1",
      name: "Advanced Mathematics Final",
      subject: "MATH-401",
      date: "2024-01-25",
      time: "10:00 AM",
      duration: "120 minutes",
      status: "ready",
      verificationRequired: true,
      verificationComplete: true,
      instructor: "Dr. Smith",
      location: "Virtual",
      description: "Comprehensive final examination covering advanced calculus and linear algebra",
      maxScore: 100,
      passingScore: 70,
      questionsCount: 50,
    },
    {
      id: "exam2",
      name: "Computer Science Data Structures",
      subject: "CS-301",
      date: "2024-01-27",
      time: "2:00 PM",
      duration: "90 minutes",
      status: "scheduled",
      verificationRequired: true,
      verificationComplete: false,
      instructor: "Prof. Johnson",
      location: "Virtual",
      description: "Assessment on trees, graphs, and algorithm complexity",
      maxScore: 100,
      passingScore: 65,
      questionsCount: 40,
    },
    {
      id: "exam3",
      name: "Physics Laboratory Assessment",
      subject: "PHYS-202",
      date: "2024-01-30",
      time: "11:00 AM",
      duration: "75 minutes",
      status: "scheduled",
      verificationRequired: false,
      verificationComplete: false,
      instructor: "Dr. Wilson",
      location: "Hybrid",
      description: "Laboratory techniques and experimental analysis",
      maxScore: 80,
      passingScore: 56,
      questionsCount: 30,
    },
  ];

  const completedExams = [
    {
      id: "exam3",
      name: "Introduction to Biology",
      subject: "BIO-101",
      date: "2024-01-15",
      score: "85/100",
      percentage: 85,
      grade: "B+",
      status: "passed",
      suspicionScore: "low",
      instructor: "Dr. Brown",
      duration: "90 minutes",
      questionsCount: 45,
      timeSpent: "87 minutes",
    },
    {
      id: "exam4",
      name: "World History Survey",
      subject: "HIST-201",
      date: "2024-01-10",
      score: "92/100",
      percentage: 92,
      grade: "A-",
      status: "passed",
      suspicionScore: "low",
      instructor: "Prof. Davis",
      duration: "120 minutes",
      questionsCount: 60,
      timeSpent: "115 minutes",
    },
    {
      id: "exam5",
      name: "Chemistry Fundamentals",
      subject: "CHEM-101",
      date: "2024-01-05",
      score: "67/100",
      percentage: 67,
      grade: "C+",
      status: "passed",
      suspicionScore: "medium",
      instructor: "Dr. Lee",
      duration: "100 minutes",
      questionsCount: 50,
      timeSpent: "98 minutes",
    },
  ];

  const warnings = [
    {
      id: "warn1",
      examName: "Chemistry Fundamentals",
      date: "2024-01-05",
      type: "tab_switch",
      description: "Multiple browser tab switches detected during examination",
      severity: "medium",
      impact: "Minor grade deduction applied",
    },
  ];

  // Calculate student statistics
  const studentStats = {
    averageScore: completedExams.reduce((acc, exam) => acc + exam.percentage, 0) / completedExams.length,
    totalExams: completedExams.length,
    passedExams: completedExams.filter(exam => exam.status === "passed").length,
    upcomingCount: upcomingExams.length,
    currentGPA: 3.4,
  };

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
          <Badge className="bg-amber-100 text-amber-800 border-amber-300 animate-pulse">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Verification Required
          </Badge>
        );
      }
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-300">
          <Clock className="h-3 w-3 mr-1" />
          Scheduled
        </Badge>
      );
    }
    if (status === "ready") {
      return (
        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
          <Play className="h-3 w-3 mr-1" />
          Ready to Start
        </Badge>
      );
    }
    if (status === "passed") {
      return (
        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
          <CheckCircle className="h-3 w-3 mr-1" />
          Passed
        </Badge>
      );
    }
    if (status === "failed") {
      return (
        <Badge className="bg-red-100 text-red-800 border-red-300">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Failed
        </Badge>
      );
    }
    return <Badge variant="outline">{status}</Badge>;
  };

  const getSuspicionBadge = (score: string) => {
    if (score === "low") {
      return (
        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
          <CheckCircle className="h-3 w-3 mr-1" />
          Low Risk
        </Badge>
      );
    }
    if (score === "medium") {
      return (
        <Badge className="bg-amber-100 text-amber-800 border-amber-300">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Medium Risk
        </Badge>
      );
    }
    if (score === "high") {
      return (
        <Badge className="bg-red-100 text-red-800 border-red-300">
          <AlertTriangle className="h-3 w-3 mr-1" />
          High Risk
        </Badge>
      );
    }
    return null;
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-emerald-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-slate-200/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Brand Section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-indigo-600">
                  The Invigilator
                </h1>
                <p className="text-sm text-slate-600 font-medium">Student Portal</p>
              </div>
            </div>

            {/* Current Time */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-sm text-slate-500">Current Time</div>
                <div className="text-lg font-semibold text-slate-900">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {warnings.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {warnings.length}
                  </span>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-3 hover:bg-white/60 rounded-xl p-2">
                    <Avatar className="h-10 w-10 ring-2 ring-white/50">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${studentId}`} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                        {studentName.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden sm:block">
                      <p className="text-sm font-semibold text-slate-900">{studentName}</p>
                      <p className="text-xs text-slate-500">ID: {studentId}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-white/90 backdrop-blur-xl border-white/20" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold">{studentName}</p>
                      <p className="text-xs text-slate-500">Student ID: {studentId}</p>
                      <div className="flex items-center mt-2 text-xs text-emerald-600">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                        Online since 8:45 AM
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-white/50">
                    <Settings className="mr-3 h-4 w-4" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/50">
                    <HelpCircle className="mr-3 h-4 w-4" />
                    Help & Support
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600 hover:bg-red-50">
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-6">
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-3">
                Welcome back, {studentName.split(' ')[0]}!
              </h2>
              <p className="text-xl text-slate-600 font-medium">
                Ready to excel in your next examination
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="text-right">
                <div className="text-sm text-slate-500 mb-1">Academic Progress</div>
                <div className="text-3xl font-bold text-emerald-600">
                  {studentStats.averageScore.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-600">Average Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Upcoming Exams</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{studentStats.upcomingCount}</p>
                  <div className="text-sm text-blue-600 font-medium">Next exam in 2 days</div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Average Score</p>
                  <p className={`text-4xl font-bold mb-2 ${getGradeColor(studentStats.averageScore)}`}>
                    {studentStats.averageScore.toFixed(1)}%
                  </p>
                  <div className="flex items-center text-emerald-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">+5% this semester</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Completed Exams</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{studentStats.totalExams}</p>
                  <div className="text-sm text-emerald-600 font-medium">
                    {studentStats.passedExams}/{studentStats.totalExams} passed
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Current GPA</p>
                  <p className="text-4xl font-bold text-emerald-600 mb-2">{studentStats.currentGPA}</p>
                  <div className="text-sm text-slate-600 font-medium">Out of 4.0</div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="group cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              onClick={handleCheckSystem}
            >
              <CardContent className="p-0">
                <div className="h-3 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Monitor className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-lg mb-1">System Check</h4>
                      <p className="text-sm text-slate-600">Verify your device setup</p>
                      <div className="flex items-center mt-2 text-blue-600 group-hover:text-blue-700">
                        <span className="text-xs font-medium">Run diagnostics</span>
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="group cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              onClick={handleViewExamRules}
            >
              <CardContent className="p-0">
                <div className="h-3 bg-gradient-to-r from-emerald-600 to-teal-600"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-lg mb-1">Exam Guidelines</h4>
                      <p className="text-sm text-slate-600">Review exam protocols</p>
                      <div className="flex items-center mt-2 text-emerald-600 group-hover:text-emerald-700">
                        <span className="text-xs font-medium">View rules</span>
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="group cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              onClick={() => window.open("#", "_blank")}
            >
              <CardContent className="p-0">
                <div className="h-3 bg-gradient-to-r from-amber-600 to-orange-600"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <HelpCircle className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-lg mb-1">Get Support</h4>
                      <p className="text-sm text-slate-600">Contact technical help</p>
                      <div className="flex items-center mt-2 text-amber-600 group-hover:text-amber-700">
                        <span className="text-xs font-medium">Get help</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="group cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              onClick={() => setActiveTab("completed")}
            >
              <CardContent className="p-0">
                <div className="h-3 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-lg mb-1">View Results</h4>
                      <p className="text-sm text-slate-600">Check your exam scores</p>
                      <div className="flex items-center mt-2 text-purple-600 group-hover:text-purple-700">
                        <span className="text-xs font-medium">View grades</span>
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg h-14">
            <TabsTrigger value="upcoming" className="text-base font-semibold data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Exams
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-base font-semibold data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700">
              <Trophy className="h-5 w-5 mr-2" />
              Completed Exams
            </TabsTrigger>
            <TabsTrigger value="warnings" className="text-base font-semibold data-[state=active]:bg-amber-100 data-[state=active]:text-amber-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Alerts
              {warnings.length > 0 && (
                <span className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-xs font-bold">
                  {warnings.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingExams.length === 0 ? (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="pt-16 pb-16 text-center">
                  <Calendar className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-slate-600 mb-2">No upcoming exams</p>
                  <p className="text-slate-500">Enjoy your break! New exams will appear here when scheduled.</p>
                </CardContent>
              </Card>
            ) : (
              upcomingExams.map((exam) => (
                <Card key={exam.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-2xl font-bold text-slate-900">{exam.name}</h3>
                            {getStatusBadge(exam.status, exam.verificationRequired, exam.verificationComplete)}
                          </div>
                          <p className="text-slate-600 font-medium mb-1">{exam.subject} • {exam.instructor}</p>
                          <p className="text-slate-500 text-sm leading-relaxed">{exam.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Date & Time</p>
                            <p className="font-semibold text-slate-900">{exam.date}</p>
                            <p className="text-sm text-slate-600">{exam.time}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <Timer className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Duration</p>
                            <p className="font-semibold text-slate-900">{exam.duration}</p>
                            <p className="text-sm text-slate-600">{exam.questionsCount} questions</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Target className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Scoring</p>
                            <p className="font-semibold text-slate-900">{exam.maxScore} points</p>
                            <p className="text-sm text-slate-600">Pass: {exam.passingScore}+</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Location</p>
                            <p className="font-semibold text-slate-900">{exam.location}</p>
                            <p className="text-sm text-slate-600">Proctored</p>
                          </div>
                        </div>
                      </div>

                      {exam.verificationRequired && !exam.verificationComplete && (
                        <Alert className="mb-6 bg-amber-50 border-amber-200 border-l-4 border-l-amber-500">
                          <AlertTriangle className="h-5 w-5 text-amber-600" />
                          <AlertDescription className="text-amber-700 font-medium">
                            Identity verification is required before starting this exam. Please complete the verification process.
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <Shield className="h-4 w-4" />
                          <span>Secure proctoring enabled</span>
                        </div>
                        <div className="flex space-x-3">
                          <Button variant="outline" onClick={handleViewExamRules} className="border-slate-200 hover:bg-slate-50">
                            <BookOpen className="h-4 w-4 mr-2" />
                            View Rules
                          </Button>
                          {exam.status === "ready" ? (
                            <Button onClick={() => handleStartExam(exam.id)} className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg">
                              <Play className="h-4 w-4 mr-2" />
                              Start Exam
                            </Button>
                          ) : exam.verificationRequired && !exam.verificationComplete ? (
                            <Button onClick={handleCheckSystem} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg">
                              <Camera className="h-4 w-4 mr-2" />
                              Complete Verification
                            </Button>
                          ) : (
                            <Button disabled className="bg-slate-200 text-slate-500">
                              <Clock className="h-4 w-4 mr-2" />
                              Not Available Yet
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedExams.length === 0 ? (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="pt-16 pb-16 text-center">
                  <Trophy className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-slate-600 mb-2">No completed exams yet</p>
                  <p className="text-slate-500">Your exam results will appear here after completion.</p>
                </CardContent>
              </Card>
            ) : (
              completedExams.map((exam) => (
                <Card key={exam.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-bold text-slate-900">{exam.name}</h3>
                          {getStatusBadge(exam.status)}
                        </div>
                        <p className="text-slate-600 font-medium mb-1">{exam.subject} • {exam.instructor}</p>
                        <p className="text-slate-500 text-sm">Completed on {exam.date}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-4xl font-bold ${getGradeColor(exam.percentage)} mb-1`}>
                          {exam.grade}
                        </div>
                        <div className="text-lg font-semibold text-slate-700">{exam.score}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Score</p>
                          <p className="font-semibold text-slate-900">{exam.percentage}%</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Timer className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Time Used</p>
                          <p className="font-semibold text-slate-900">{exam.timeSpent}</p>
                          <p className="text-xs text-slate-500">of {exam.duration}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Questions</p>
                          <p className="font-semibold text-slate-900">{exam.questionsCount}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          <Shield className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Security</p>
                          <div>{getSuspicionBadge(exam.suspicionScore)}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-slate-600">
                        Performance: {exam.percentage >= 90 ? 'Excellent' : exam.percentage >= 80 ? 'Good' : exam.percentage >= 70 ? 'Satisfactory' : 'Needs Improvement'}
                      </div>
                      <div className="flex space-x-3">
                        <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="warnings" className="space-y-6">
            {warnings.length === 0 ? (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="pt-16 pb-16 text-center">
                  <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-slate-600 mb-2">No warnings</p>
                  <p className="text-slate-500">Great job! You have maintained excellent exam conduct.</p>
                </CardContent>
              </Card>
            ) : (
              warnings.map((warning) => (
                <Card key={warning.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl border-l-4 border-l-amber-500">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-slate-900">{warning.examName}</h3>
                          <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                            {warning.severity} severity
                          </Badge>
                        </div>
                        <p className="text-slate-600 font-medium mb-2">{warning.description}</p>
                        <p className="text-slate-500 text-sm mb-3">Date: {warning.date}</p>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <p className="text-amber-800 text-sm font-medium">Impact: {warning.impact}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Dialogs */}
      <SystemCheckDialog open={showSystemCheck} onOpenChange={setShowSystemCheck} />
      <ExamRulesDialog open={showExamRules} onOpenChange={setShowExamRules} />

      {/* Start Exam Confirmation Dialog */}
      <Dialog open={showStartExam} onOpenChange={setShowStartExam}>
        <DialogContent className="bg-white/90 backdrop-blur-xl border-white/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">Ready to Start Exam?</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-900">System Check Complete</p>
                  <p className="text-sm text-blue-700">All requirements verified</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
                <div>
                  <p className="font-semibold text-emerald-900">Identity Verified</p>
                  <p className="text-sm text-emerald-700">Ready to proceed</p>
                </div>
              </div>
              <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Important Reminders:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Ensure you have a stable internet connection</li>
                  <li>Do not switch tabs or applications during the exam</li>
                  <li>Your session will be continuously monitored</li>
                </ul>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStartExam(false)}>
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
              <Play className="h-4 w-4 mr-2" />
              Start Exam Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentDashboard;
