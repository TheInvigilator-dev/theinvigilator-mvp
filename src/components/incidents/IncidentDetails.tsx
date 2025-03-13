import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  Eye,
  MessageSquare,
  Play,
  X,
  Check,
  Clock,
} from "lucide-react";

interface Evidence {
  id: string;
  type: "video" | "screen" | "audio";
  timestamp: string;
  url: string;
}

interface IncidentDetailsProps {
  incident?: {
    id: string;
    studentName: string;
    studentId: string;
    examName: string;
    incidentType: string;
    severity: "high" | "medium" | "low";
    timestamp: string;
    status: "pending" | "reviewed" | "dismissed";
    description: string;
    evidence: Evidence[];
    aiAnalysis: string;
  };
  onAction?: (action: string, incidentId: string) => void;
}

const IncidentDetails: React.FC<IncidentDetailsProps> = ({
  incident = {
    id: "INC-1234",
    studentName: "Alex Johnson",
    studentId: "STU-5678",
    examName: "Advanced Mathematics Final",
    incidentType: "Multiple Faces Detected",
    severity: "high",
    timestamp: "2023-06-15T14:32:45",
    status: "pending",
    description:
      "The AI system detected multiple faces in the camera frame for more than 30 seconds.",
    evidence: [
      {
        id: "ev-1",
        type: "video",
        timestamp: "2023-06-15T14:32:45",
        url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      },
      {
        id: "ev-2",
        type: "screen",
        timestamp: "2023-06-15T14:32:45",
        url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      },
      {
        id: "ev-3",
        type: "audio",
        timestamp: "2023-06-15T14:32:45",
        url: "https://example.com/audio/incident-1234.mp3",
      },
    ],
    aiAnalysis:
      "The system detected two distinct faces in the frame with 98.7% confidence. The second face appeared at 14:32:15 and remained visible for approximately 45 seconds. The primary test-taker appeared to be communicating with the second individual.",
  },
  onAction = (action, incidentId) =>
    console.log(`Action ${action} taken on incident ${incidentId}`),
}) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    setConfirmDialogOpen(true);
  };

  const confirmAction = () => {
    onAction(selectedAction, incident.id);
    setConfirmDialogOpen(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "default";
      case "reviewed":
        return "secondary";
      case "dismissed":
        return "outline";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white w-full h-full overflow-auto">
      <Card className="border-0 shadow-none h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">
                {incident.studentName}
              </CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Student ID: {incident.studentId} | Exam: {incident.examName}
              </div>
            </div>
            <div className="flex gap-2">
              <Badge
                variant={getSeverityColor(incident.severity) as any}
                className="uppercase"
              >
                {incident.severity} Severity
              </Badge>
              <Badge
                variant={getStatusColor(incident.status) as any}
                className="uppercase"
              >
                {incident.status}
              </Badge>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 text-red-500">
              <AlertTriangle size={18} />
              <span className="font-semibold">{incident.incidentType}</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              <Clock size={14} className="inline mr-1" />{" "}
              {formatDate(incident.timestamp)}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Incident Description</h3>
            <p className="text-gray-700">{incident.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-700">{incident.aiAnalysis}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Evidence</h3>
            <Tabs defaultValue="video" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="video">Video Evidence</TabsTrigger>
                <TabsTrigger value="screen">Screen Recording</TabsTrigger>
                <TabsTrigger value="audio">Audio Recording</TabsTrigger>
              </TabsList>

              <TabsContent value="video" className="mt-0">
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={
                      incident.evidence.find((e) => e.type === "video")?.url ||
                      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                    }
                    alt="Video evidence"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full bg-white/80 hover:bg-white"
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Recorded at{" "}
                  {formatDate(
                    incident.evidence.find((e) => e.type === "video")
                      ?.timestamp || incident.timestamp,
                  )}
                </div>
              </TabsContent>

              <TabsContent value="screen" className="mt-0">
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={
                      incident.evidence.find((e) => e.type === "screen")?.url ||
                      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                    }
                    alt="Screen recording"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full bg-white/80 hover:bg-white"
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Recorded at{" "}
                  {formatDate(
                    incident.evidence.find((e) => e.type === "screen")
                      ?.timestamp || incident.timestamp,
                  )}
                </div>
              </TabsContent>

              <TabsContent value="audio" className="mt-0">
                <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center h-40">
                  <div className="text-center">
                    <div className="w-full h-20 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                      {/* Audio waveform visualization placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center space-x-1">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className="bg-blue-500 w-1 rounded-full"
                              style={{ height: `${Math.random() * 60 + 10}px` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Play className="h-4 w-4" /> Play Audio
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Recorded at{" "}
                  {formatDate(
                    incident.evidence.find((e) => e.type === "audio")
                      ?.timestamp || incident.timestamp,
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>

        <CardFooter className="border-t pt-4 flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => handleActionClick("message")}
            >
              <MessageSquare className="h-4 w-4" /> Message Student
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => handleActionClick("view")}
            >
              <Eye className="h-4 w-4" /> View Full Session
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
              onClick={() => handleActionClick("terminate")}
            >
              <X className="h-4 w-4" /> Terminate Exam
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="gap-1"
              onClick={() => handleActionClick("dismiss")}
            >
              <Check className="h-4 w-4" /> Dismiss
            </Button>
            <Button
              size="sm"
              className="gap-1"
              onClick={() => handleActionClick("warn")}
            >
              <AlertTriangle className="h-4 w-4" /> Send Warning
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to{" "}
              {selectedAction === "terminate"
                ? "terminate this exam"
                : selectedAction === "warn"
                  ? "send a warning to this student"
                  : selectedAction === "dismiss"
                    ? "dismiss this incident"
                    : selectedAction === "message"
                      ? "message this student"
                      : "view the full session"}
              ?
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant={
                selectedAction === "terminate" ? "destructive" : "default"
              }
              onClick={confirmAction}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IncidentDetails;
