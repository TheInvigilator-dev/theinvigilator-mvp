import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  BarChart4,
  Users,
  AlertTriangle,
  Calendar,
  Search,
  Bell,
  Settings,
  LogOut,
  Activity,
  Eye,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  Monitor,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Filter,
  Download,
  RefreshCw,
  Zap,
  Globe,
  Database,
  Wifi,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight,
  Gauge,
  Server,
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  Square,
  FileText,
  UserCheck,
  AlertOctagon,
  MapPin,
  Layers,
} from "lucide-react";

interface AdminDashboardProps {
  onLogout?: () => void;
}

const AdminDashboard = ({ onLogout = () => { } }: AdminDashboardProps) => {
  const [activeView, setActiveView] = useState("overview");
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Enhanced real-time data simulation
  const [liveStats, setLiveStats] = useState({
    activeExams: 42,
    studentsOnline: 1247,
    suspiciousActivities: 8,
    systemHealth: 98.7,
    examsStoday: 156,
    averageScore: 87.3,
    flaggedStudents: 12,
    serverLoad: 67,
  });

  // Performance metrics
  const [performanceData, setPerformanceData] = useState({
    cpuUsage: 68,
    memoryUsage: 74,
    networkLatency: 23,
    diskUsage: 45,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        activeExams: Math.max(0, prev.activeExams + Math.floor(Math.random() * 3) - 1),
        studentsOnline: Math.max(0, prev.studentsOnline + Math.floor(Math.random() * 20) - 10),
        suspiciousActivities: Math.max(0, prev.suspiciousActivities + Math.floor(Math.random() * 2) - 1),
        systemHealth: Math.max(95, Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 0.5)),
        serverLoad: Math.max(30, Math.min(90, prev.serverLoad + (Math.random() - 0.5) * 5)),
      }));

      setPerformanceData(prev => ({
        cpuUsage: Math.max(20, Math.min(95, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        networkLatency: Math.max(5, Math.min(100, prev.networkLatency + (Math.random() - 0.5) * 10)),
        diskUsage: Math.max(20, Math.min(80, prev.diskUsage + (Math.random() - 0.5) * 5)),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const quickActions = [
    {
      id: "create-exam",
      title: "Create New Exam",
      description: "Set up a new examination session",
      icon: <PlusCircle className="h-6 w-6 text-white" />,
      gradient: "from-blue-600 via-blue-500 to-cyan-500",
      hoverGradient: "hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600",
      onClick: () => setActiveView("create-exam"),
    },
    {
      id: "monitor",
      title: "Live Monitoring",
      description: "Real-time exam session oversight",
      icon: <Monitor className="h-6 w-6 text-white" />,
      gradient: "from-emerald-600 via-emerald-500 to-teal-500",
      hoverGradient: "hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-600",
      onClick: () => setActiveView("monitoring"),
    },
    {
      id: "incidents",
      title: "Security Alerts",
      description: "Review flagged activities",
      icon: <AlertTriangle className="h-6 w-6 text-white" />,
      gradient: "from-amber-600 via-amber-500 to-orange-500",
      hoverGradient: "hover:from-amber-700 hover:via-amber-600 hover:to-orange-600",
      onClick: () => setActiveView("incidents"),
    },
    {
      id: "analytics",
      title: "Advanced Analytics",
      description: "Comprehensive reporting suite",
      icon: <BarChart4 className="h-6 w-6 text-white" />,
      gradient: "from-purple-600 via-purple-500 to-pink-500",
      hoverGradient: "hover:from-purple-700 hover:via-purple-600 hover:to-pink-600",
      onClick: () => setActiveView("analytics"),
    },
  ];

  const recentExams = [
    {
      id: "exam-001",
      name: "Advanced Mathematics Final Examination",
      students: 67,
      status: "active",
      startTime: "2h 15m ago",
      suspiciousCount: 4,
      progress: 72,
      timeRemaining: "47 min",
      proctorCount: 3,
      location: "Virtual",
    },
    {
      id: "exam-002",
      name: "Computer Science Data Structures",
      students: 43,
      status: "completed",
      startTime: "5h 22m ago",
      suspiciousCount: 1,
      progress: 100,
      timeRemaining: "Completed",
      proctorCount: 2,
      location: "Hybrid",
    },
    {
      id: "exam-003",
      name: "Physics Laboratory Assessment",
      students: 35,
      status: "active",
      startTime: "32m ago",
      suspiciousCount: 0,
      progress: 28,
      timeRemaining: "1h 28m",
      proctorCount: 2,
      location: "Virtual",
    },
    {
      id: "exam-004",
      name: "Chemistry Organic Compounds Quiz",
      students: 52,
      status: "starting",
      startTime: "Starting in 15m",
      suspiciousCount: 0,
      progress: 0,
      timeRemaining: "Not started",
      proctorCount: 3,
      location: "Virtual",
    },
  ];

  const systemAlerts = [
    {
      id: "alert-001",
      type: "critical",
      title: "High Server Load Detected",
      description: "CPU usage at 89% - scaling additional resources",
      time: "2 min ago",
      action: "Auto-scaling initiated",
    },
    {
      id: "alert-002",
      type: "warning",
      title: "Suspicious Activity Pattern",
      description: "Multiple tab switches detected in Exam #001",
      time: "8 min ago",
      action: "Investigation required",
    },
    {
      id: "alert-003",
      type: "info",
      title: "System Update Available",
      description: "SecureProctor v2.3.1 ready for deployment",
      time: "1h 15m ago",
      action: "Schedule update",
    },
    {
      id: "alert-004",
      type: "success",
      title: "Backup Completed Successfully",
      description: "Daily system backup completed at 2:00 AM",
      time: "6h ago",
      action: "Verified",
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertOctagon className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'info':
        return <Bell className="h-4 w-4 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      default:
        return <Bell className="h-4 w-4 text-slate-500" />;
    }
  };

  const getHealthColor = (value: number) => {
    if (value >= 95) return "text-emerald-600";
    if (value >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceColor = (value: number) => {
    if (value <= 50) return "bg-emerald-500";
    if (value <= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30">
      {/* Enhanced Header with Glass Morphism */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-slate-200/20">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            {/* Brand Section */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-indigo-600">
                    The Invigilator
                  </h1>
                  <p className="text-sm text-slate-600 font-medium">Administrator Portal</p>
                </div>
              </div>

              {/* Enhanced Search */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  placeholder="Search exams, students, incidents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 w-96 h-12 bg-white/60 border-white/40 focus:bg-white/80 focus:border-blue-300/50 rounded-xl shadow-sm transition-all duration-200"
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
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>

              {/* Enhanced System Status */}
              <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200/50">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-30"></div>
                </div>
                <span className="text-sm font-semibold text-emerald-700">System Online</span>
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
                  {systemAlerts.filter(alert => alert.type === 'critical' || alert.type === 'warning').length}
                </span>
              </Button>

              {/* Enhanced User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 rounded-xl hover:bg-white/60">
                    <Avatar className="h-10 w-10 ring-2 ring-white/50">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                        AD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-white/90 backdrop-blur-xl border-white/20" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold">Administrator</p>
                      <p className="text-xs text-slate-500">admin@secureproctor.com</p>
                      <div className="flex items-center mt-2 text-xs text-emerald-600">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                        Online since 8:30 AM
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
      <div className="p-8">
        {/* Enhanced Welcome Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-3">
                Welcome back, Administrator
              </h2>
              <p className="text-xl text-slate-600 font-medium">
                Overseeing {liveStats.activeExams} active exams with {liveStats.studentsOnline.toLocaleString()} students online
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500 mb-1">Current Time</div>
              <div className="text-lg font-semibold text-slate-900">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-sm text-slate-600">
                {new Date().toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Active Exams</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{liveStats.activeExams}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-emerald-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm font-semibold">+18%</span>
                    </div>
                    <span className="text-xs text-slate-500">vs yesterday</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Activity className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Students Online</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{liveStats.studentsOnline.toLocaleString()}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-emerald-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm font-semibold">+12%</span>
                    </div>
                    <span className="text-xs text-slate-500">vs yesterday</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">Security Alerts</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{liveStats.suspiciousActivities}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-red-600">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      <span className="text-sm font-semibold">-24%</span>
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
                  <p className="text-sm font-medium text-slate-600 mb-1">System Health</p>
                  <p className={`text-4xl font-bold mb-2 ${getHealthColor(liveStats.systemHealth)}`}>
                    {liveStats.systemHealth.toFixed(1)}%
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-emerald-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm font-semibold">Optimal</span>
                    </div>
                    <span className="text-xs text-slate-500">All systems green</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Gauge className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <Card
                key={action.id}
                className="group cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                onClick={action.onClick}
              >
                <CardContent className="p-0">
                  <div className={`h-3 bg-gradient-to-r ${action.gradient}`}></div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {action.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-lg mb-1">{action.title}</h4>
                        <p className="text-sm text-slate-600">{action.description}</p>
                        <div className="flex items-center mt-2 text-blue-600 group-hover:text-blue-700">
                          <span className="text-xs font-medium">Get started</span>
                          <ArrowUpRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Recent Exams */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900">Live Exam Sessions</CardTitle>
                    <p className="text-slate-600 mt-1">Real-time monitoring and management</p>
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
                {recentExams.map((exam) => (
                  <div key={exam.id} className="p-6 bg-gradient-to-r from-slate-50/80 to-white/80 rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all duration-200 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-bold text-slate-900 text-lg">{exam.name}</h4>
                          <Badge
                            variant={exam.status === "active" ? "default" : exam.status === "starting" ? "secondary" : "outline"}
                            className={
                              exam.status === "active"
                                ? "bg-emerald-100 text-emerald-700 border-emerald-200 animate-pulse"
                                : exam.status === "starting"
                                  ? "bg-blue-100 text-blue-700 border-blue-200"
                                  : "bg-slate-100 text-slate-700 border-slate-200"
                            }
                          >
                            {exam.status === "active" && <div className="w-2 h-2 bg-emerald-500 rounded-full mr-1 animate-pulse"></div>}
                            {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                          </Badge>
                        </div>
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
                            <UserCheck className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-600">Proctors:</span>
                            <span className="font-semibold text-slate-900">{exam.proctorCount}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-600">Mode:</span>
                            <span className="font-semibold text-slate-900">{exam.location}</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-xl">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Contact Proctors
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center justify-between">
                      {exam.status === "active" && (
                        <div className="flex-1 mr-6">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-600">Progress</span>
                            <div className="flex items-center space-x-4">
                              <span className="font-semibold text-slate-900">{exam.progress}%</span>
                              <span className="text-slate-600">⏱ {exam.timeRemaining}</span>
                            </div>
                          </div>
                          <Progress value={exam.progress} className="h-3 bg-slate-200" />
                        </div>
                      )}

                      <div className="flex items-center space-x-4">
                        {exam.suspiciousCount > 0 && (
                          <div className="flex items-center space-x-1 px-3 py-1 bg-red-50 rounded-lg">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-semibold text-red-700">{exam.suspiciousCount} alerts</span>
                          </div>
                        )}

                        {exam.status === "active" && (
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" className="h-8">
                              <Pause className="h-3 w-3 mr-1" />
                              Pause
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 text-red-600 border-red-200 hover:bg-red-50">
                              <Square className="h-3 w-3 mr-1" />
                              End
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Enhanced System Alerts */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-slate-900">System Alerts</CardTitle>
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 rounded-xl border border-slate-200/50 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm">{alert.title}</p>
                        <p className="text-slate-600 text-xs mt-1 leading-relaxed">{alert.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-slate-400">{alert.time}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${alert.type === 'critical' ? 'bg-red-100 text-red-700' :
                            alert.type === 'warning' ? 'bg-amber-100 text-amber-700' :
                              alert.type === 'info' ? 'bg-blue-100 text-blue-700' :
                                'bg-emerald-100 text-emerald-700'
                            }`}>
                            {alert.action}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced System Performance */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-900">System Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Server className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-900">CPU Usage</span>
                        <p className="text-xs text-slate-500">Processing power</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">{performanceData.cpuUsage}%</div>
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${getPerformanceColor(performanceData.cpuUsage)}`}
                          style={{ width: `${performanceData.cpuUsage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Database className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-900">Memory</span>
                        <p className="text-xs text-slate-500">RAM utilization</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">{performanceData.memoryUsage}%</div>
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${getPerformanceColor(performanceData.memoryUsage)}`}
                          style={{ width: `${performanceData.memoryUsage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Wifi className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-900">Network</span>
                        <p className="text-xs text-slate-500">{performanceData.networkLatency}ms latency</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">Optimal</div>
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-14 h-full bg-emerald-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                        <Layers className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-900">Storage</span>
                        <p className="text-xs text-slate-500">Disk space used</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">{performanceData.diskUsage}%</div>
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${getPerformanceColor(performanceData.diskUsage)}`}
                          style={{ width: `${performanceData.diskUsage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Today's Summary */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-900">Today's Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-700 font-medium">Exams completed</span>
                    <span className="font-bold text-slate-900 text-lg">{liveStats.examsStoday}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-700 font-medium">Average score</span>
                    <span className="font-bold text-emerald-600 text-lg">{liveStats.averageScore}%</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-700 font-medium">Flagged students</span>
                    <span className="font-bold text-amber-600 text-lg">{liveStats.flaggedStudents}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-700 font-medium">System uptime</span>
                    <span className="font-bold text-emerald-600 text-lg">99.8%</span>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Daily Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
