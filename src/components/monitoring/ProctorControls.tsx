import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  MessageCircle,
  AlertTriangle,
  Pause,
  Square,
  Video,
  Mic,
  MicOff,
  VideoOff,
  MessageSquare,
  Play,
  Volume2,
  VolumeX,
  Camera,
  CameraOff,
  Shield,
  Eye,
  EyeOff,
  MoreHorizontal,
  Clock,
  User,
  BookOpen,
  FileText,
  Download,
  Share,
  Flag,
  Zap,
  Activity,
} from "lucide-react";

interface ProctorControlsProps {
  studentName?: string;
  examName?: string;
  examDuration?: string;
  timeRemaining?: string;
  suspicionLevel?: "low" | "medium" | "high";
  onSendWarning?: (message: string) => void;
  onPauseExam?: () => void;
  onResumeExam?: () => void;
  onTerminateExam?: () => void;
  onStartChat?: (studentId?: string) => void;
  onToggleVideo?: (enabled: boolean) => void;
  onToggleAudio?: (enabled: boolean) => void;
  onTakeScreenshot?: () => void;
  onRecordIncident?: () => void;
  onViewExamDetails?: () => void;
  isExamPaused?: boolean;
  isExamActive?: boolean;
}

const ProctorControls = ({
  studentName = "Alex Johnson",
  examName = "Advanced Computer Science Final",
  examDuration = "120 minutes",
  timeRemaining = "45 minutes",
  suspicionLevel = "low",
  onSendWarning = (message) => console.log("Warning sent:", message),
  onPauseExam = () => console.log("Exam paused"),
  onResumeExam = () => console.log("Exam resumed"),
  onTerminateExam = () => console.log("Exam terminated"),
  onStartChat = (studentId) => console.log("Chat started with", studentId),
  onToggleVideo = (enabled) => console.log(`Video ${enabled ? "enabled" : "disabled"}`),
  onToggleAudio = (enabled) => console.log(`Audio ${enabled ? "enabled" : "disabled"}`),
  onTakeScreenshot = () => console.log("Screenshot taken"),
  onRecordIncident = () => console.log("Incident recorded"),
  onViewExamDetails = () => console.log("Viewing exam details"),
  isExamPaused = false,
  isExamActive = true,
}: ProctorControlsProps) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isTerminateDialogOpen, setIsTerminateDialogOpen] = useState(false);
  const [isWarningDialogOpen, setIsWarningDialogOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [warningType, setWarningType] = useState("general");

  const handleToggleVideo = () => {
    const newState = !isVideoEnabled;
    setIsVideoEnabled(newState);
    onToggleVideo(newState);
  };

  const handleToggleAudio = () => {
    const newState = !isAudioEnabled;
    setIsAudioEnabled(newState);
    onToggleAudio(newState);
  };

  const handleSendWarning = () => {
    if (warningMessage.trim()) {
      onSendWarning(warningMessage);
      setWarningMessage("");
      setIsWarningDialogOpen(false);
    }
  };

  const getSuspicionColor = (level: string) => {
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

  const warningTemplates = [
    { id: "behavior", label: "Suspicious Behavior", message: "Please maintain proper exam conduct and avoid suspicious activities." },
    { id: "audio", label: "Audio Issue", message: "Please ensure your microphone is working and avoid background noise." },
    { id: "camera", label: "Camera Position", message: "Please adjust your camera to clearly show your face and exam area." },
    { id: "focus", label: "Stay Focused", message: "Please keep your attention on the exam and avoid looking away frequently." },
    { id: "materials", label: "Unauthorized Materials", message: "Please remove any unauthorized materials from your exam area." },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl rounded-2xl border border-slate-700/50">
      {/* Enhanced Header Section */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Student & Exam Info */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h3 className="text-white font-bold text-lg">{studentName}</h3>
                <Badge className={getSuspicionColor(suspicionLevel)}>
                  <Shield className="h-3 w-3 mr-1" />
                  {suspicionLevel} risk
                </Badge>
                {isExamActive && (
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    <Activity className="h-3 w-3 mr-1 animate-pulse" />
                    Live
                  </Badge>
                )}
              </div>
              <p className="text-slate-300 text-sm font-medium">{examName}</p>
              <div className="flex items-center space-x-4 text-xs text-slate-400 mt-1">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {timeRemaining} remaining
                </span>
                <span className="flex items-center">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {examDuration} total
                </span>
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isVideoEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-xs text-slate-300">Video</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isAudioEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-xs text-slate-300">Audio</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-xs text-slate-300">Monitoring</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Controls Section */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Media Controls */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center">
              <Camera className="h-4 w-4 mr-2" />
              Media Controls
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleToggleVideo}
                      className={`h-12 transition-all duration-200 ${isVideoEnabled
                        ? "bg-emerald-600 hover:bg-emerald-700 border-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                        : "bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-300"
                        }`}
                    >
                      {isVideoEnabled ? (
                        <Video className="h-4 w-4" />
                      ) : (
                        <VideoOff className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isVideoEnabled ? "Disable" : "Enable"} student video</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleToggleAudio}
                      className={`h-12 transition-all duration-200 ${isAudioEnabled
                        ? "bg-blue-600 hover:bg-blue-700 border-blue-500 text-white shadow-lg shadow-blue-500/25"
                        : "bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-300"
                        }`}
                    >
                      {isAudioEnabled ? (
                        <Mic className="h-4 w-4" />
                      ) : (
                        <MicOff className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isAudioEnabled ? "Disable" : "Enable"} student audio</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Communication Controls */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Communication
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onStartChat && onStartChat('current')}
                      className="h-12 bg-indigo-600 hover:bg-indigo-700 border-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all duration-200"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Start chat with student</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Dialog open={isWarningDialogOpen} onOpenChange={setIsWarningDialogOpen}>
                <DialogTrigger asChild>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-12 bg-amber-600 hover:bg-amber-700 border-amber-500 text-white shadow-lg shadow-amber-500/25 transition-all duration-200"
                        >
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Send warning to student</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DialogTrigger>
                <DialogContent className="bg-white/95 backdrop-blur-xl border-white/20 max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-slate-900 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
                      Send Warning
                    </DialogTitle>
                    <DialogDescription>
                      Send a warning message to {studentName}. This action will be logged.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Quick Templates</label>
                      <div className="grid grid-cols-1 gap-2">
                        {warningTemplates.map((template) => (
                          <Button
                            key={template.id}
                            variant="outline"
                            size="sm"
                            className="justify-start text-left h-auto p-2"
                            onClick={() => setWarningMessage(template.message)}
                          >
                            <div>
                              <div className="font-medium text-xs">{template.label}</div>
                              <div className="text-xs text-slate-500 truncate">{template.message}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Custom Message</label>
                      <Textarea
                        value={warningMessage}
                        onChange={(e) => setWarningMessage(e.target.value)}
                        placeholder="Enter custom warning message..."
                        className="min-h-[80px]"
                      />
                    </div>
                    <Alert className="bg-amber-50 border-amber-200">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-700 text-sm">
                        Warning messages are logged and may impact the student's exam record.
                      </AlertDescription>
                    </Alert>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsWarningDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSendWarning}
                      disabled={!warningMessage.trim()}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Send Warning
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Exam Controls */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              Exam Control
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={isExamPaused ? onResumeExam : onPauseExam}
                      className="h-12 bg-orange-600 hover:bg-orange-700 border-orange-500 text-white shadow-lg shadow-orange-500/25 transition-all duration-200"
                    >
                      {isExamPaused ? (
                        <Play className="h-4 w-4" />
                      ) : (
                        <Pause className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isExamPaused ? "Resume" : "Pause"} exam</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Dialog open={isTerminateDialogOpen} onOpenChange={setIsTerminateDialogOpen}>
                <DialogTrigger asChild>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-12 bg-red-600 hover:bg-red-700 border-red-500 text-white shadow-lg shadow-red-500/25 transition-all duration-200"
                        >
                          <Square className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Terminate exam</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DialogTrigger>
                <DialogContent className="bg-white/95 backdrop-blur-xl border-white/20">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-slate-900 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                      Terminate Exam
                    </DialogTitle>
                    <DialogDescription>
                      Are you sure you want to terminate the exam for {studentName}? This action cannot be undone and will immediately end their exam session.
                    </DialogDescription>
                  </DialogHeader>
                  <Alert className="bg-red-50 border-red-200">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">
                      <strong>Warning:</strong> Terminating the exam will:
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Immediately end the student's exam session</li>
                        <li>Lock their current progress</li>
                        <li>Generate an incident report</li>
                        <li>Notify the exam administrator</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsTerminateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        onTerminateExam();
                        setIsTerminateDialogOpen(false);
                      }}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Terminate Exam
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="mt-6 pt-6 border-t border-slate-700/50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-semibold text-slate-300">Additional Actions:</h4>
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={onTakeScreenshot} className="text-slate-300 hover:text-white hover:bg-slate-700">
                        <Camera className="h-4 w-4 mr-1" />
                        Screenshot
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Take screenshot of student's screen</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={onRecordIncident} className="text-slate-300 hover:text-white hover:bg-slate-700">
                        <Flag className="h-4 w-4 mr-1" />
                        Record Incident
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Record suspicious activity</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={onViewExamDetails} className="text-slate-300 hover:text-white hover:bg-slate-700">
                        <FileText className="h-4 w-4 mr-1" />
                        Exam Details
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View exam information</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* More Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-700">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-xl border-white/20" align="end">
                <DropdownMenuLabel>More Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download Session Log
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="mr-2 h-4 w-4" />
                  Share Session
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Analytics
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Report Issue
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProctorControls;
