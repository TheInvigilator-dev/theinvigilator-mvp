import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import IncidentList from "./IncidentList";
import IncidentDetails from "./IncidentDetails";

interface Incident {
  id: string;
  studentName: string;
  studentId: string;
  examName: string;
  incidentType:
    | "multiple_faces"
    | "unusual_movement"
    | "suspicious_audio"
    | "navigation_away";
  severity: "high" | "medium" | "low";
  status: "new" | "reviewing" | "resolved";
  timestamp: string;
  thumbnailUrl: string;
  description?: string;
  aiAnalysis?: string;
  evidence?: {
    id: string;
    type: "video" | "screen" | "audio";
    timestamp: string;
    url: string;
  }[];
}

interface FlaggedIncidentsPanelProps {
  incidents?: Incident[];
  onAction?: (action: string, incidentId: string) => void;
}

const defaultIncidents: Incident[] = [
  {
    id: "1",
    studentName: "Alex Johnson",
    studentId: "S12345",
    examName: "Advanced Mathematics",
    incidentType: "multiple_faces",
    severity: "high",
    status: "new",
    timestamp: "2023-06-15T10:23:45Z",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
    description:
      "The AI system detected multiple faces in the camera frame for more than 30 seconds.",
    aiAnalysis:
      "The system detected two distinct faces in the frame with 98.7% confidence. The second face appeared at 10:23:15 and remained visible for approximately 45 seconds. The primary test-taker appeared to be communicating with the second individual.",
    evidence: [
      {
        id: "ev-1",
        type: "video",
        timestamp: "2023-06-15T10:23:45Z",
        url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      },
      {
        id: "ev-2",
        type: "screen",
        timestamp: "2023-06-15T10:23:45Z",
        url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      },
      {
        id: "ev-3",
        type: "audio",
        timestamp: "2023-06-15T10:23:45Z",
        url: "https://example.com/audio/incident-1234.mp3",
      },
    ],
  },
  {
    id: "2",
    studentName: "Maria Garcia",
    studentId: "S23456",
    examName: "Computer Science 101",
    incidentType: "unusual_movement",
    severity: "medium",
    status: "reviewing",
    timestamp: "2023-06-15T10:45:12Z",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    description:
      "Unusual head and hand movements detected during the exam session.",
    aiAnalysis:
      "The system detected rapid head movements and hand gestures that match patterns consistent with looking at hidden notes or communicating with someone off-camera.",
    evidence: [
      {
        id: "ev-4",
        type: "video",
        timestamp: "2023-06-15T10:45:12Z",
        url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      },
      {
        id: "ev-5",
        type: "screen",
        timestamp: "2023-06-15T10:45:12Z",
        url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      },
    ],
  },
  {
    id: "3",
    studentName: "James Wilson",
    studentId: "S34567",
    examName: "Introduction to Biology",
    incidentType: "suspicious_audio",
    severity: "low",
    status: "resolved",
    timestamp: "2023-06-15T11:05:33Z",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    description: "Background voices detected during the exam session.",
    aiAnalysis:
      "The system detected background voices with 75% confidence. The voices appear to be discussing content related to the exam subject.",
    evidence: [
      {
        id: "ev-6",
        type: "audio",
        timestamp: "2023-06-15T11:05:33Z",
        url: "https://example.com/audio/incident-3456.mp3",
      },
      {
        id: "ev-7",
        type: "video",
        timestamp: "2023-06-15T11:05:33Z",
        url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      },
    ],
  },
];

const FlaggedIncidentsPanel: React.FC<FlaggedIncidentsPanelProps> = ({
  incidents = defaultIncidents,
  onAction = (action, incidentId) =>
    console.log(`Action ${action} taken on incident ${incidentId}`),
}) => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<string>("all");

  const handleSelectIncident = (incident: Incident) => {
    setSelectedIncident(incident);
  };

  const handleAction = (action: string, incidentId: string) => {
    onAction(action, incidentId);
    // Optionally update local state based on action
    if (action === "dismiss") {
      // Update the incident status or remove it from view
      setSelectedIncident(null);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedIncident(null); // Clear selection when changing tabs
  };

  // Filter incidents based on active tab
  const filteredIncidents = incidents.filter((incident) => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return incident.status === "new";
    if (activeTab === "reviewing") return incident.status === "reviewing";
    if (activeTab === "resolved") return incident.status === "resolved";
    return true;
  });

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-xl font-bold flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
          Flagged Incidents Review
        </CardTitle>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="mt-2"
        >
          <TabsList>
            <TabsTrigger value="all">All Incidents</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="reviewing">Reviewing</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-120px)]">
        <div className="flex h-full">
          <div
            className={`${selectedIncident ? "w-1/3 border-r" : "w-full"} h-full transition-all duration-200`}
          >
            <IncidentList
              incidents={filteredIncidents}
              onSelectIncident={handleSelectIncident}
            />
          </div>

          {selectedIncident && (
            <div className="w-2/3 h-full overflow-auto">
              <IncidentDetails
                incident={{
                  id: selectedIncident.id,
                  studentName: selectedIncident.studentName,
                  studentId: selectedIncident.studentId,
                  examName: selectedIncident.examName,
                  incidentType: selectedIncident.incidentType,
                  severity: selectedIncident.severity,
                  timestamp: selectedIncident.timestamp,
                  status:
                    selectedIncident.status === "new"
                      ? "pending"
                      : selectedIncident.status === "reviewing"
                        ? "reviewed"
                        : "dismissed",
                  description:
                    selectedIncident.description ||
                    "No detailed description available for this incident.",
                  evidence: selectedIncident.evidence || [],
                  aiAnalysis:
                    selectedIncident.aiAnalysis ||
                    "No AI analysis available for this incident.",
                }}
                onAction={handleAction}
              />
            </div>
          )}

          {!selectedIncident && (
            <div className="hidden w-2/3 h-full items-center justify-center text-gray-400 lg:flex flex-col">
              <AlertCircle className="h-16 w-16 mb-4 opacity-20" />
              <h3 className="text-xl font-medium mb-2">No Incident Selected</h3>
              <p className="text-center max-w-md">
                Select an incident from the list to view detailed information
                and take action.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlaggedIncidentsPanel;
