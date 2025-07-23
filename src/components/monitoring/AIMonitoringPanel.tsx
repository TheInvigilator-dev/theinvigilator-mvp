import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription } from "../ui/alert";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  AlertCircle,
  ArrowLeft,
  Download,
  Clock,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  Eye,
  Camera,
  Mic,
  Monitor,
  BarChart3,
  Shield,
  Timer,
  Flag,
  RefreshCw,
  Maximize2,
  Volume2,
  Wifi,
  Zap,
  Target,
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  Square,
  MessageSquare,
  FileText,
  Settings,
  MoreHorizontal,
  MapPin,
  Database,
  Layers
} from "lucide-react";
import StudentVideoFeed from "./StudentVideoFeed";
import ScreenRecording from "./ScreenRecording";
import AudioVisualizer from "./AudioVisualizer";
import ProctorControls from "./ProctorControls";

interface AIMonitoringPanelProps {
  studentId?: string;
  studentName?: string;
  examName?: string;
  examDuration?: string;
  timeRemaining?: string;
  suspicionLevel?: "low" | "medium" | "high";
  onBack?: () => void;
  onDownloadEvidence?: () => void;
}

const AIMonitoringPanel: React.FC<AIMonitoringPanelProps> = ({
  studentId = "STU12345",
  studentName = "Jane Smith",
  examName = "Advanced Mathematics Final Examination",
  examDuration = "120 minutes",
  timeRemaining = "47 minutes",
  suspicionLevel = "medium",
  onBack = () => console.log("Back clicked"),
  onDownloadEvidence = () => console.log("Download evidence clicked"),
}) => {
  const [activeTab, setActiveTab] = useState("live");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showIncidentDialog, setShowIncidentDialog] = useState(false);
  const [fullscreenView, setFullscreenView] = useState<string | null>(null);

  // Enhanced suspicious activities with more detailed information
  const [suspiciousActivities, setSuspiciousActivities] = useState([
    {
      id: "sa1",
      type: "multiple_faces",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      severity: "high",
      description: "Multiple faces detected in camera view",
      confidence: 94.2,
      duration: "15 seconds",
      aiModel: "FaceDetection v2.1",
      evidence: ["screenshot_001.jpg", "video_segment_001.mp4"],
      status: "investigating",
      tags: ["identity", "security"],
    },
    {
      id: "sa2",
      type: "tab_switch",
      timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
      severity: "medium",
      description: "Student navigated away from test window",
      confidence: 87.5,
      duration: "3 seconds",
      aiModel: "WindowMonitor v1.8",
      evidence: ["screen_capture_002.jpg"],
      status: "acknowledged",
      tags: ["navigation", "behavior"],
    },
    {
      id: "sa3",
      type: "audio_anomaly",
      timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
      severity: "low",
      description: "Background conversation detected",
      confidence: 72.1,
      duration: "8 seconds",
      aiModel: "AudioAnalyzer v3.0",
      evidence: ["audio_segment_003.wav"],
      status: "resolved",
      tags: ["audio", "environment"],
    },
    {
      id: "sa4",
      type: "eye_tracking",
      timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      severity: "medium",
      description: "Unusual eye movement patterns detected",
      confidence: 81.3,
      duration: "22 seconds",
      aiModel: "EyeTracker v4.2",
      evidence: ["gaze_pattern_004.json"],
      status: "reviewing",
      tags: ["gaze", "behavior"],
    },
  ]);

  // Real-time monitoring stats
  const [monitoringStats, setMonitoringStats] = useState({
    totalFlags: 4,
    avgConfidence: 83.8,
    sessionDuration: "73 minutes",
    lastAlert: "5 minutes ago",
    systemLoad: 68,
    networkLatency: 45,
    videoQuality: 98,
    audioQuality: 95,
  });

  // Performance metrics
  const [performanceMetrics, setPerformanceMetrics] = useState({
    alertResponseTime: 1.2,
    falsePositiveRate: 3.1,
    detectionAccuracy: 94.7,
    systemUptime: 99.8,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMonitoringStats(prev => ({
        ...prev,
        systemLoad: Math.max(20, Math.min(90, prev.systemLoad + (Math.random() - 0.5) * 10)),
        networkLatency: Math.max(10, Math.min(100, prev.networkLatency + (Math.random() - 0.5) * 15)),
        videoQuality: Math.max(80, Math.min(100, prev.videoQuality + (Math.random() - 0.5) * 5)),
        audioQuality: Math.max(75, Math.min(100, prev.audioQuality + (Math.random() - 0.5) * 8)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handleSendWarning = (message: string) => {
    console.log("Warning sent to student", studentName, ":", message);
  };

  const handlePauseExam = () => {
    console.log("Exam paused for student", studentName);
  };

  const handleResumeExam = () => {
    console.log("Exam resumed for student", studentName);
  };

  const handleTerminateExam = () => {
    console.log("Exam terminated for student", studentName);
  };

  const handleStartChat = () => {
    console.log("Chat started with student", studentName);
  };

  const handleAudioAnomaly = (type: string, level: number) => {
    console.log(`Audio anomaly detected: ${type}, level: ${level}`);
    if (level > 0.8) {
      const newActivity = {
        id: `sa${Date.now()}`,
        type: "audio_anomaly",
        timestamp: new Date().toISOString(),
        severity: level > 0.9 ? "high" : "medium",
        description: `Audio anomaly detected: ${type}`,
        confidence: level * 100,
        duration: "ongoing",
        aiModel: "AudioAnalyzer v3.0",
        evidence: [`audio_${Date.now()}.wav`],
        status: "investigating",
        tags: ["audio", "real-time"],
      };
      setSuspiciousActivities([newActivity, ...suspiciousActivities]);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500 hover:bg-red-600 text-white";
      case "medium":
        return "bg-amber-500 hover:bg-amber-600 text-white";
      case "low":
        return "bg-blue-500 hover:bg-blue-600 text-white";
      default:
        return "bg-slate-500 hover:bg-slate-600 text-white";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />;
      case "medium":
        return <Flag className="h-4 w-4" />;
      case "low":
        return <Eye className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "investigating":
        return "bg-red-100 text-red-700 border-red-200";
      case "acknowledged":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "resolved":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "reviewing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getSuspicionLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200 animate-pulse";
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "low":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 flex flex-col">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-slate-200/20">
        <div className="px-8 py-6">
          <div className="flex justify-between items-center">
            {/* Left Section */}
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="hover:bg-white/60 rounded-xl h-12 w-12"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 ring-4 ring-white shadow-xl">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${studentId}`} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                      {studentName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                    <Activity className="h-3 w-3 text-white animate-pulse" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h1 className="text-2xl font-bold text-slate-900">{studentName}</h1>
                    <Badge className={getSuspicionLevelColor(suspicionLevel)}>
                      <Shield className="h-3 w-3 mr-1" />
                      {suspicionLevel} risk
                    </Badge>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                      <Activity className="h-3 w-3 mr-1 animate-pulse" />
                      Live Monitoring
                    </Badge>
                  </div>
                  <p className="text-lg font-medium text-slate-600">{examName}</p>
                  <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {timeRemaining} remaining
                    </span>
                    <span className="flex items-center">
                      <Timer className="h-4 w-4 mr-1" />
                      {examDuration} total
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Student ID: {studentId}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* System Status */}
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-xs text-slate-500 mb-1">System Load</div>
                  <div className="text-lg font-bold text-slate-900">{monitoringStats.systemLoad}%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-500 mb-1">Network</div>
                  <div className="text-lg font-bold text-emerald-600">{monitoringStats.networkLatency}ms</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-500 mb-1">Video Quality</div>
                  <div className="text-lg font-bold text-blue-600">{monitoringStats.videoQuality}%</div>
                </div>
              </div>

              {/* Action Buttons */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="border-slate-200 hover:bg-slate-50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onDownloadEvidence}
                className="border-slate-200 hover:bg-slate-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Evidence
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/90 backdrop-blur-xl border-white/20" align="end">
                  <DropdownMenuLabel>Session Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Camera className="mr-2 h-4 w-4" />
                    Take Screenshot
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Report Critical Issue
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-grow overflow-hidden">
        <div className="h-full p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            {/* Enhanced Tab Navigation */}
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-14">
                <TabsTrigger value="live" className="text-base font-semibold data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 px-8">
                  <Monitor className="h-5 w-5 mr-2" />
                  Live Monitoring
                </TabsTrigger>
                <TabsTrigger value="activities" className="text-base font-semibold data-[state=active]:bg-red-100 data-[state=active]:text-red-700 px-8">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Suspicious Activities
                  <Badge className="ml-2 bg-red-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs">
                    {suspiciousActivities.filter(a => a.status === 'investigating').length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="text-base font-semibold data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 px-8">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              {/* Real-time Stats */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-600">Monitoring Active</span>
                </div>
                <div className="text-sm text-slate-600">
                  Last Alert: {monitoringStats.lastAlert}
                </div>
                <div className="text-sm text-slate-600">
                  Confidence: {monitoringStats.avgConfidence}%
                </div>
              </div>
            </div>

            <TabsContent value="live" className="flex-grow flex flex-col">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                {/* Main Monitoring Feeds */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full">
                    {/* Student Video Feed */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-bold text-slate-900 flex items-center">
                            <Camera className="h-5 w-5 mr-2" />
                            Student Camera
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-emerald-600 font-medium">Live</span>
                            <Button variant="ghost" size="sm" onClick={() => setFullscreenView('camera')}>
                              <Maximize2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <StudentVideoFeed
                          studentId={studentId}
                          studentName={studentName}
                          examName={examName}
                          isVerified={true}
                          suspiciousMovements={suspicionLevel === 'high'}
                        />
                      </CardContent>
                    </Card>

                    {/* Screen Recording */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-bold text-slate-900 flex items-center">
                            <Monitor className="h-5 w-5 mr-2" />
                            Screen Share
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-blue-600 font-medium">Recording</span>
                            <Button variant="ghost" size="sm" onClick={() => setFullscreenView('screen')}>
                              <Maximize2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ScreenRecording
                          studentName={studentName}
                          examName={examName}
                          hasTabSwitched={suspiciousActivities.some(a => a.type === 'tab_switch' && a.status === 'investigating')}
                        />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Audio Visualizer */}
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-slate-900 flex items-center">
                          <Mic className="h-5 w-5 mr-2" />
                          Audio Analysis
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-purple-600 font-medium">Analyzing</span>
                          <Badge className="bg-slate-100 text-slate-700">
                            Quality: {monitoringStats.audioQuality}%
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <AudioVisualizer
                        studentName={studentName}
                        onAnomalyDetected={handleAudioAnomaly}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar with Real-time Stats */}
                <div className="space-y-6">
                  {/* Performance Metrics */}
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold text-slate-900">Real-time Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Zap className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-slate-600">Response Time</span>
                          </div>
                          <span className="text-sm font-bold text-slate-900">{performanceMetrics.alertResponseTime}s</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm text-slate-600">Detection Accuracy</span>
                          </div>
                          <span className="text-sm font-bold text-emerald-600">{performanceMetrics.detectionAccuracy}%</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Database className="h-4 w-4 text-purple-500" />
                            <span className="text-sm text-slate-600">System Uptime</span>
                          </div>
                          <span className="text-sm font-bold text-purple-600">{performanceMetrics.systemUptime}%</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                            <span className="text-sm text-slate-600">False Positive Rate</span>
                          </div>
                          <span className="text-sm font-bold text-amber-600">{performanceMetrics.falsePositiveRate}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Alerts Summary */}
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold text-slate-900">Alert Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            <span className="text-sm font-medium text-red-700">High Priority</span>
                          </div>
                          <Badge className="bg-red-500 text-white">
                            {suspiciousActivities.filter(a => a.severity === 'high').length}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Flag className="h-5 w-5 text-amber-500" />
                            <span className="text-sm font-medium text-amber-700">Medium Priority</span>
                          </div>
                          <Badge className="bg-amber-500 text-white">
                            {suspiciousActivities.filter(a => a.severity === 'medium').length}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Eye className="h-5 w-5 text-blue-500" />
                            <span className="text-sm font-medium text-blue-700">Low Priority</span>
                          </div>
                          <Badge className="bg-blue-500 text-white">
                            {suspiciousActivities.filter(a => a.severity === 'low').length}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-xl">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold text-slate-900">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button
                          className="w-full justify-start bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg"
                          onClick={() => setShowIncidentDialog(true)}
                        >
                          <Flag className="h-4 w-4 mr-2" />
                          Record Incident
                        </Button>
                        <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
                          <Camera className="h-4 w-4 mr-2" />
                          Take Screenshot
                        </Button>
                        <Button className="w-full justify-start bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact Student
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activities" className="flex-grow">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl h-full">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-slate-900">Suspicious Activities Log</CardTitle>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-red-100 text-red-700">
                        Total Flags: {suspiciousActivities.length}
                      </Badge>
                      <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                        <Download className="h-4 w-4 mr-2" />
                        Export Log
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-full overflow-auto">
                  {suspiciousActivities.length > 0 ? (
                    <div className="space-y-4">
                      {suspiciousActivities.map((activity) => (
                        <Card key={activity.id} className="bg-gradient-to-r from-white to-slate-50/50 border border-slate-200/50 hover:shadow-lg transition-all duration-200">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between
 mb-4">
                              <div className="flex items-start space-x-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getSeverityColor(activity.severity)}`}>
                                  {getSeverityIcon(activity.severity)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <h4 className="font-bold text-slate-900 text-lg">{activity.description}</h4>
                                    <Badge className={getStatusColor(activity.status)}>
                                      {activity.status}
                                    </Badge>
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                                    <div>
                                      <span className="text-slate-500">Time:</span>
                                      <span className="ml-2 font-medium text-slate-900">{formatTimestamp(activity.timestamp)}</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500">Confidence:</span>
                                      <span className="ml-2 font-medium text-slate-900">{activity.confidence.toFixed(1)}%</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500">Duration:</span>
                                      <span className="ml-2 font-medium text-slate-900">{activity.duration}</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500">AI Model:</span>
                                      <span className="ml-2 font-medium text-slate-900">{activity.aiModel}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2 mb-3">
                                    {activity.tags.map((tag) => (
                                      <Badge
                                        key={tag} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    Evidence: {activity.evidence.join(", ")}
                                  </div>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Evidence
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Files
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Flag className="mr-2 h-4 w-4" />
                                    Mark as Resolved
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                      <p className="text-xl font-semibold text-slate-600 mb-2">No suspicious activities detected</p>
                      <p className="text-slate-500">The student is maintaining excellent exam conduct.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="flex-grow">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-900">Session Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{monitoringStats.sessionDuration}</div>
                          <div className="text-sm text-blue-700">Session Duration</div>
                        </div>
                        <div className="text-center p-4 bg-emerald-50 rounded-lg">
                          <div className="text-2xl font-bold text-emerald-600">{monitoringStats.avgConfidence.toFixed(1)}%</div>
                          <div className="text-sm text-emerald-700">Avg Confidence</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Video Quality</span>
                            <span className="font-medium">{monitoringStats.videoQuality}%</span>
                          </div>
                          <Progress value={monitoringStats.videoQuality} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Audio Quality</span>
                            <span className="font-medium">{monitoringStats.audioQuality}%</span>
                          </div>
                          <Progress value={monitoringStats.audioQuality} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-900">AI Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Detection Accuracy</span>
                        <span className="font-bold text-emerald-600">{performanceMetrics.detectionAccuracy}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">False Positive Rate</span>
                        <span className="font-bold text-amber-600">{performanceMetrics.falsePositiveRate}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Response Time</span>
                        <span className="font-bold text-blue-600">{performanceMetrics.alertResponseTime}s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">System Uptime</span>
                        <span className="font-bold text-purple-600">{performanceMetrics.systemUptime}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Enhanced Proctor Controls */}
      <div className="border-t border-slate-200/50 bg-white/50 backdrop-blur-sm">
        <div className="p-6">
          <ProctorControls
            studentName={studentName}
            examName={examName}
            examDuration={examDuration}
            timeRemaining={timeRemaining}
            suspicionLevel={suspicionLevel}
            onSendWarning={handleSendWarning}
            onPauseExam={handlePauseExam}
            onResumeExam={handleResumeExam}
            onTerminateExam={handleTerminateExam}
            onStartChat={handleStartChat}
            isExamActive={true}
            isExamPaused={false}
          />
        </div>
      </div>

      {/* Incident Recording Dialog */}
      <Dialog open={showIncidentDialog} onOpenChange={setShowIncidentDialog}>
        <DialogContent className="bg-white/95 backdrop-blur-xl border-white/20">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">Recor
              d Incident</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert className="bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700">
                This will create a formal incident report for review.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowIncidentDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Record Incident
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIMonitoringPanel;
