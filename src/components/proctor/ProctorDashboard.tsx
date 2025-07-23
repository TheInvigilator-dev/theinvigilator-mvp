import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Alert, AlertDescription } from "../ui/alert";
import {
  Eye,
  Shield,
  Users,
  AlertTriangle,
  Clock,
  Search,
  Bell,
  Settings,
  LogOut,
  Monitor,
  Camera,
  Mic,
  MessageSquare,
  Play,
  Pause,
  Square,
  RefreshCw,
  Filter,
  Download,
  BarChart3,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  AlertOctagon,
  Zap,
  Activity,
  MapPin,
  Timer,
  FileText,
  UserCheck,
  Volume2,
  Wifi,
  HelpCircle,
  MoreHorizontal,
  ArrowUpRight,
  Layers,
  Target,
  Database,
} from "lucide-react";
import AIMonitoringPanel from "../monitoring/AIMonitoringPanel";
import ChatInterface from "../communication/ChatInterface";

interface ProctorDashboardProps {
  proctorName?: string;
  proctorId?: string;
  onLogout?: () => void;
}

const ProctorDashboard = ({
  proctorName = "Dr. Sarah Wilson",
  proctorId = "PROC001",
  onLogout = () => { },
}: ProctorDashboardProps) => {
  const [activeView, setActiveView] = useState("overview");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState("live");
  const [showChat, setShowChat] = useState(false);
  const [chatStudentId, setChatStudentId] = useState<string | null>(null);

  // Real-time monitoring stats
  const [liveStats, setLiveStats] = useState({
    activeStudents: 34,
    flaggedActivities: 7,
    examsSessions: 5,
    systemHealth: 98.9,
    averageScore: 82.4,
    completionRate: 76,
  });

  // Performance metrics
  const [performanceData, setPerformanceData] = useState({
    responseTime: 1.2,
    alertAccuracy: 94.5,
    falsePositives: 3.2,
    monitoring: 99.1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        activeStudents: Math.max(0, prev.activeStudents + Math.floor(Math.random() * 3) - 1),
        flaggedActivities: Math.max(0, prev.flaggedActivities + Math.floor(Math.random() * 2) - 1),
        systemHealth: Math.max(95, Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 0.3)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Mock active exam sessions
  const activeExams = [
    {
      id: "exam-001",
      name: "Advanced Mathematics Final",
      students: 12,
      timeRemaining: "47 min",
      flaggedCount: 2,
      progress: 68,
      status: "active",
      startTime: "2h 15m ago",
      instructor: "Dr. Smith",
    },
    {
      id: "exam-002",
      name: "Computer Science Data Structures",
      students: 8,
      timeRemaining: "1h 23m",
      flaggedCount: 1,
      progress: 45,
      status: "active",
      startTime: "55m ago",
      instructor: "Prof. Johnson",
    },
    {
      id: "exam-003",
      name: "Physics Laboratory Assessment",
      students: 14,
      timeRemaining: "2h 12m",
      flaggedCount: 4,
      progress: 32,
      status: "active",
      startTime: "28m ago",
      instructor: "Dr. Wilson",
    },
  ];

  // Mock student monitoring data
  const monitoredStudents = [
    {
      id: "stu-001",
      name: "Emma Thompson",
      examName: "Advanced Mathematics Final",
      status: "active",
      riskLevel: "low",
      progress: 72,
      timeSpent: "1h 35m",
      flaggedCount: 0,
      lastActivity: "2 min ago",
      cameraStatus: "active",
      audioStatus: "active",
      score: 88,
    },
    {
      id: "stu-002",
      name: "Marcus Johnson",
      examName: "Computer Science Data Structures",
      status: "flagged",
      riskLevel: "high",
      progress: 45,
      timeSpent: "58m",
      flaggedCount: 3,
      lastActivity: "Just now",
      cameraStatus: "active",
      audioStatus: "issue",
      score: 67,
    },
    {
      id: "stu-003",
      name: "Sofia Rodriguez",
      examName: "Physics Laboratory Assessment",
      status: "active",
      riskLevel: "medium",
      progress: 28,
      timeSpent: "32m",
      flaggedCount: 1,
      lastActivity: "5 min ago",
      cameraStatus: "active",
      audioStatus: "active",
      score: 79,
    },
    {
      id: "stu-004",
      name: "David Chen",
      examName: "Advanced Mathematics Final",
      status: "active",
      riskLevel: "low",
      progress: 81,
      timeSpent: "1h 42m",
      flaggedCount: 0,
      lastActivity: "1 min ago",
      cameraStatus: "active",
      audioStatus: "active",
      score: 92,
    },
  ];

  // Mock recent alerts
  const recentAlerts = [
    {
      id: "alert-001",
      studentName: "Marcus Johnson",
      type: "multiple_faces",
      severity: "high",
      time: "2 min ago",
      description: "Multiple faces detected in camera view",
      status: "investigating",
    },
    {
      id: "alert-002",
      studentName: "Sofia Rodriguez",
      type: "tab_switch",
      severity: "medium",
      time: "8 min ago",
      description: "Student switched browser tabs",
      status: "acknowledged",
    },
    {
      id: "alert-003",
      studentName: "James Wilson",
      type: "audio_anomaly",
      severity: "low",
      time: "15 min ago",
      description: "Background conversation detected",
      status: "resolved",
    },
  ];

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-amber-100 text-amber-700 border-amber-200";
      case "low": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-emerald-500";
      case "flagged": return "bg-red-500 animate-pulse";
      case "paused": return "bg-amber-500";
      default: return "bg-slate-500";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "multiple_faces": return <Users className="h-4 w-4" />;
      case "tab_switch": return <Monitor className="h-4 w-4" />;
      case "audio_anomaly": return <Volume2 className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  // Handle chat functions
  const handleStartChat = (studentId: string) => {
    setChatStudentId(studentId);
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setChatStudentId(null);
  };

  if (selectedStudent) {
    return (
      <AIMonitoringPanel
        studentId={selectedStudent}
        studentName={monitoredStudents.find(s => s.id === selectedStudent)?.name}
        examName={monitoredStudents.find(s => s.id === selectedStudent)?.examName}
        onBack={() => setSelectedStudent(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-slate-200/20">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            {/* Brand Section */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/25">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-indigo-600">
                    The Invigilator
                  </h1>
                  <p className="text-sm text-slate-600 font-medium">Proctor Dashboard</p>
                </div>
              </div>

              {/* Enhanced Search */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <Input
                  placeholder="Search students, exams, alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 w-96 h-12 bg-white/60 border-white/40 focus:bg-white/80 focus:border-indigo-300/50 rounded-xl shadow-sm transition-all duration-200"
                />
              </div>
            </div>

            {/* Enhanced Right Section */}
            <div className="flex items-center space-x-4">
              {/* Time Range Selector */}
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-32 bg-white/60 border-white/40 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                </SelectContent>
              </Select>

              {/* Enhanced System Status */}
              <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200/50">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-30"></div>
                </div>
                <span className="text-sm font-semibold text-emerald-700">Monitoring Active</span>
                <div className="text-xs text-emerald-600">
                  {liveStats.systemHealth.toFixed(1)}% uptime
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="hover:bg-white/60 rounded-xl h-12 w-12"
              >
                <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>

              <Button variant="ghost" size="icon" className="relative hover:bg-white/60 rounded-xl h-12 w-12">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                  {recentAlerts.filter(alert => alert.status === 'investigating').length}
                </span>
              </Button>

              {/* Enhanced User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 rounded-xl hover:bg-white/60">
                    <Avatar className="h-10 w-10 ring-2 ring-white/50">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=proctor" />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                        PR
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-white/90 backdrop-blur-xl border-white/20" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold">{proctorName}</p>
                      <p className="text-xs text-slate-500">ID: {proctorId}</p>
                      <div className="flex items-center mt-2 text-xs text-emerald-600">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                        On duty since 8:00 AM
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-white/50">
                    <Settings className="mr-3 h-4 w-4" />
                    Proctor Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/50">
                    <HelpCircle className="mr-3 h-4 w-4" />
                    Help & Guidelines
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600 hover:bg-red-50">
                    <LogOut className="mr-3 h-4 w-4" />
                    End Session
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        {/* Enhanced Welcome Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-3">
                Welcome, {proctorName.split(' ')[1]}
              </h2>
              <p className="text-xl text-slate-600 font-medium">
                Monitoring {liveStats.activeStudents} students across {liveStats.examsSessions} active exam sessions
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500 mb-1">Alert Response Time</div>
              <div className="text-3xl font-bold text-indigo-600">
                {performanceData.responseTime}s
              </div>
              <div className="text-sm text-slate-600">Average response</div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Active Students</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{liveStats.activeStudents}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-emerald-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm font-semibold">+8%</span>
                    </div>
                    <span className="text-xs text-slate-500">vs yesterday</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Flagged Activities</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{liveStats.flaggedActivities}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-red-600">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      <span className="text-sm font-semibold">-15%</span>
                    </div>
                    <span className="text-xs text-slate-500">vs yesterday</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Exam Sessions</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{liveStats.examsSessions}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-emerald-600">
                      <Activity className="h-4 w-4 mr-1" />
                      <span className="text-sm font-semibold">All Active</span>
                    </div>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Monitor className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Alert Accuracy</p>
                  <p className="text-4xl font-bold text-indigo-600 mb-2">{performanceData.alertAccuracy}%</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-emerald-600">
                      <Target className="h-4 w-4 mr-1" />
                      <span className="text-sm font-semibold">High Precision</span>
                    </div>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Exam Sessions */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900">Active Exam Sessions</CardTitle>
                    <p className="text-slate-600 mt-1">Real-time monitoring and control</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeExams.map((exam) => (
                  <div key={exam.id} className="p-6 bg-gradient-to-r from-slate-50/80 to-white/80 rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all duration-200 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-bold text-slate-900 text-lg">{exam.name}</h4>
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-1 animate-pulse"></div>
                            Active
                          </Badge>
                        </div>
                        <p className="text-slate-600 font-medium mb-2">Instructor: {exam.instructor}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-600">Students:</span>
                            <span className="font-semibold text-slate-900">{exam.students}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-600">Started:</span>
                            <span className="font-semibold text-slate-900">{exam.startTime}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Timer className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-600">Time Left:</span>
                            <span className="font-semibold text-slate-900">{exam.timeRemaining}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-600">Flags:</span>
                            <span className={`font-semibold ${exam.flaggedCount > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                              {exam.flaggedCount}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 mr-6">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-600">Progress</span>
                            <span className="font-semibold text-slate-900">{exam.progress}%</span>
                          </div>
                          <Progress value={exam.progress} className="h-3 bg-slate-200" />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="h-8" onClick={() => setSelectedStudent('overview')}>
                          <Eye className="h-3 w-3 mr-1" />
                          Monitor
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-amber-600 border-amber-200 hover:bg-amber-50">
                          <Pause className="h-3 w-3 mr-1" />
                          Pause
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Recent Alerts */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-slate-900">Recent Alerts</CardTitle>
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 rounded-xl border border-slate-200/50 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${alert.severity === 'high' ? 'bg-red-100 text-red-600' :
                        alert.severity === 'medium' ? 'bg-amber-100 text-amber-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm">{alert.studentName}</p>
                        <p className="text-slate-600 text-xs mt-1 leading-relaxed">{alert.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-slate-400">{alert.time}</span>
                          <Badge className={`text-xs px-2 py-1 ${alert.status === 'investigating' ? 'bg-red-100 text-red-700' :
                            alert.status === 'acknowledged' ? 'bg-amber-100 text-amber-700' :
                              'bg-emerald-100 text-emerald-700'
                            }`}>
                            {alert.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Monitoring Performance */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-900">Monitoring Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-900">Response Time</span>
                        <p className="text-xs text-slate-500">{performanceData.responseTime}s average</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">Excellent</div>
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-14 h-full bg-emerald-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Target className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-900">Accuracy</span>
                        <p className="text-xs text-slate-500">{performanceData.alertAccuracy}% precision</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">High</div>
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-15 h-full bg-emerald-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Database className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-900">System Load</span>
                        <p className="text-xs text-slate-500">Monitoring capacity</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">{performanceData.monitoring}%</div>
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-15 h-full bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                    onClick={() => handleStartChat('broadcast')}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Broadcast Message
                  </Button>
                  <Button
                    className="w-full justify-start bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg"
                    onClick={() => setShowWarningDialog(true)}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Send Warning
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Student Monitoring Grid */}
        <div className="mt-10">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900">Student Monitoring</CardTitle>
                  <p className="text-slate-600 mt-1">Individual student status and controls</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter by Risk
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {monitoredStudents.map((student) => (
                  <Card key={student.id} className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/50 hover:shadow-lg transition-all duration-200 cursor-pointer group" onClick={() => setSelectedStudent(student.id)}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="relative">
                          <Avatar className="h-12 w-12 ring-2 ring-white shadow-lg">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.id}`} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(student.status)} rounded-full border-2 border-white`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 truncate">{student.name}</h4>
                          <p className="text-xs text-slate-600 truncate">{student.examName}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">Progress</span>
                          <span className="text-xs font-bold text-slate-900">{student.progress}%</span>
                        </div>
                        <Progress value={student.progress} className="h-2" />

                        <div className="flex items-center justify-between">
                          <Badge className={getRiskLevelColor(student.riskLevel)}>
                            {student.riskLevel} risk
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${student.cameraStatus === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                            <Camera className="h-3 w-3 text-slate-500" />
                            <div className={`w-2 h-2 rounded-full ${student.audioStatus === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                            <Mic className="h-3 w-3 text-slate-500" />
                          </div>
                        </div>

                        {student.flaggedCount > 0 && (
                          <div className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span className="text-xs text-red-700 font-medium">{student.flaggedCount} alerts</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <div className="text-xs text-slate-500">
                            Last activity: {student.lastActivity}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 text-xs hover:bg-blue-50 hover:text-blue-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartChat(student.id);
                            }}
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Chat
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chat Interface */}
      {showChat && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] z-50">
          <ChatInterface
            studentId={chatStudentId || undefined}
            studentName={
              chatStudentId === 'broadcast'
                ? 'All Students'
                : monitoredStudents.find(s => s.id === chatStudentId)?.name || `Student ${chatStudentId}`
            }
            onClose={handleCloseChat}
          />
        </div>
      )}

      {/* Warning Dialog */}
      <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <DialogContent className="bg-white/90 backdrop-blur-xl border-white/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">Send Warning</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <p className="text-slate-600 mb-4">Send a warning message to the selected student.</p>
            <Alert className="bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700">
                This action will be logged and may affect the student's exam record.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWarningDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
              Send Warning
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProctorDashboard;
