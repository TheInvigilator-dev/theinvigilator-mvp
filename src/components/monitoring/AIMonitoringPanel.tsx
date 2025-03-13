import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { AlertCircle, ArrowLeft, Download } from "lucide-react";
import StudentVideoFeed from "./StudentVideoFeed";
import ScreenRecording from "./ScreenRecording";
import AudioVisualizer from "./AudioVisualizer";
import ProctorControls from "./ProctorControls";

interface AIMonitoringPanelProps {
  studentId?: string;
  studentName?: string;
  examName?: string;
  onBack?: () => void;
  onDownloadEvidence?: () => void;
}

const AIMonitoringPanel: React.FC<AIMonitoringPanelProps> = ({
  studentId = "STU12345",
  studentName = "Jane Smith",
  examName = "Advanced Mathematics",
  onBack = () => console.log("Back clicked"),
  onDownloadEvidence = () => console.log("Download evidence clicked"),
}) => {
  const [activeTab, setActiveTab] = useState("live");
  const [suspiciousActivities, setSuspiciousActivities] = useState([
    {
      id: "sa1",
      type: "multiple_faces",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      severity: "high",
      description: "Multiple faces detected in camera view",
    },
    {
      id: "sa2",
      type: "tab_switch",
      timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
      severity: "medium",
      description: "Student navigated away from test window",
    },
    {
      id: "sa3",
      type: "audio_anomaly",
      timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
      severity: "low",
      description: "Background conversation detected",
    },
  ]);

  // Mock function to handle sending a warning to the student
  const handleSendWarning = () => {
    console.log("Warning sent to student", studentName);
  };

  // Mock function to handle pausing the exam
  const handlePauseExam = () => {
    console.log("Exam paused for student", studentName);
  };

  // Mock function to handle terminating the exam
  const handleTerminateExam = () => {
    console.log("Exam terminated for student", studentName);
  };

  // Mock function to handle starting a chat with the student
  const handleStartChat = () => {
    console.log("Chat started with student", studentName);
  };

  // Mock function to handle audio anomaly detection
  const handleAudioAnomaly = (type: string, level: number) => {
    console.log(`Audio anomaly detected: ${type}, level: ${level}`);
    if (level > 0.8) {
      const newActivity = {
        id: `sa${Date.now()}`,
        type: "audio_anomaly",
        timestamp: new Date().toISOString(),
        severity: level > 0.9 ? "high" : "medium",
        description: `Audio anomaly detected: ${type}`,
      };
      setSuspiciousActivities([newActivity, ...suspiciousActivities]);
    }
  };

  // Helper function to format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Helper function to get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500 hover:bg-red-600";
      case "medium":
        return "bg-amber-500 hover:bg-amber-600";
      case "low":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-slate-500 hover:bg-slate-600";
    }
  };

  return (
    <div className="w-full h-full bg-slate-100 flex flex-col">
      {/* Header with back button and title */}
      <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">AI Monitoring: {studentName}</h1>
          <Badge variant="outline" className="ml-2">
            {examName}
          </Badge>
          <Badge variant="secondary" className="ml-2">
            ID: {studentId}
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={onDownloadEvidence}
        >
          <Download className="h-4 w-4" />
          Download Evidence
        </Button>
      </div>

      {/* Main content area */}
      <div className="flex-grow p-4 overflow-auto">
        <Tabs
          defaultValue="live"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="live">Live Monitoring</TabsTrigger>
              <TabsTrigger value="activities">
                Suspicious Activities
                <Badge
                  variant="destructive"
                  className="ml-2 h-5 w-5 flex items-center justify-center p-0"
                >
                  {suspiciousActivities.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="live" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-4">
                <StudentVideoFeed
                  studentId={studentId}
                  studentName={studentName}
                  examName={examName}
                  isVerified={true}
                  suspiciousMovements={false}
                />
                <AudioVisualizer
                  studentName={studentName}
                  onAnomalyDetected={handleAudioAnomaly}
                />
              </div>
              <div className="space-y-4">
                <ScreenRecording
                  studentName={studentName}
                  examName={examName}
                  hasTabSwitched={false}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  Suspicious Activities
                </h2>
                {suspiciousActivities.length > 0 ? (
                  <div className="space-y-4">
                    {suspiciousActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-slate-200"
                      >
                        <div className="mt-1">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">
                              {activity.description}
                            </h3>
                            <span className="text-sm text-slate-500">
                              {formatTimestamp(activity.timestamp)}
                            </span>
                          </div>
                          <div className="flex mt-2">
                            <Badge
                              className={getSeverityColor(activity.severity)}
                            >
                              {activity.severity.toUpperCase()}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-auto text-blue-600 hover:text-blue-800"
                            >
                              View Evidence
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    No suspicious activities detected
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Proctor controls at the bottom */}
      <div className="p-4 border-t border-slate-300">
        <ProctorControls
          studentName={studentName}
          examName={examName}
          onSendWarning={handleSendWarning}
          onPauseExam={handlePauseExam}
          onTerminateExam={handleTerminateExam}
          onStartChat={handleStartChat}
        />
      </div>
    </div>
  );
};

export default AIMonitoringPanel;
