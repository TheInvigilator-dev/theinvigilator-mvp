import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Clock, Filter } from "lucide-react";

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
}

interface IncidentListProps {
  incidents?: Incident[];
  onSelectIncident?: (incident: Incident) => void;
}

const getIncidentTypeLabel = (type: Incident["incidentType"]) => {
  switch (type) {
    case "multiple_faces":
      return "Multiple Faces Detected";
    case "unusual_movement":
      return "Unusual Movement";
    case "suspicious_audio":
      return "Suspicious Audio";
    case "navigation_away":
      return "Navigation Away";
    default:
      return type;
  }
};

const getIncidentTypeIcon = (type: Incident["incidentType"]) => {
  return <AlertCircle className="h-4 w-4 mr-1" />;
};

const getSeverityColor = (severity: Incident["severity"]) => {
  switch (severity) {
    case "high":
      return "destructive";
    case "medium":
      return "secondary";
    case "low":
      return "outline";
    default:
      return "default";
  }
};

const IncidentList = ({
  incidents = defaultIncidents,
  onSelectIncident = () => {},
}: IncidentListProps) => {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredIncidents = incidents.filter((incident) => {
    if (typeFilter !== "all" && incident.incidentType !== typeFilter)
      return false;
    if (severityFilter !== "all" && incident.severity !== severityFilter)
      return false;
    if (statusFilter !== "all" && incident.status !== statusFilter)
      return false;
    return true;
  });

  return (
    <Card className="h-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          Flagged Incidents
        </CardTitle>
        <div className="flex flex-col space-y-2 mt-2">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Incident Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="multiple_faces">Multiple Faces</SelectItem>
                <SelectItem value="unusual_movement">
                  Unusual Movement
                </SelectItem>
                <SelectItem value="suspicious_audio">
                  Suspicious Audio
                </SelectItem>
                <SelectItem value="navigation_away">Navigation Away</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-2">
            {filteredIncidents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No incidents match the selected filters
              </div>
            ) : (
              filteredIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="border rounded-lg p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => onSelectIncident(incident)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                      <img
                        src={incident.thumbnailUrl}
                        alt={`Incident ${incident.id}`}
                        className="h-full w-full object-cover"
                      />
                      <Badge
                        variant={getSeverityColor(incident.severity)}
                        className="absolute top-0 right-0 m-1 text-[10px] px-1.5 py-0"
                      >
                        {incident.severity}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm truncate">
                          {incident.studentName}
                        </h4>
                        <Badge
                          variant={
                            incident.status === "new" ? "default" : "secondary"
                          }
                          className="text-[10px] px-1.5 py-0"
                        >
                          {incident.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {incident.examName}
                      </p>
                      <div className="flex items-center mt-1">
                        {getIncidentTypeIcon(incident.incidentType)}
                        <span className="text-xs">
                          {getIncidentTypeLabel(incident.incidentType)}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(incident.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// Default mock data
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
  },
  {
    id: "4",
    studentName: "Emily Chen",
    studentId: "S45678",
    examName: "World History",
    incidentType: "navigation_away",
    severity: "high",
    status: "new",
    timestamp: "2023-06-15T11:15:22Z",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
  {
    id: "5",
    studentName: "Michael Brown",
    studentId: "S56789",
    examName: "English Literature",
    incidentType: "multiple_faces",
    severity: "medium",
    status: "reviewing",
    timestamp: "2023-06-15T11:30:45Z",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80",
  },
  {
    id: "6",
    studentName: "Sophia Martinez",
    studentId: "S67890",
    examName: "Physics 202",
    incidentType: "unusual_movement",
    severity: "high",
    status: "new",
    timestamp: "2023-06-15T11:45:10Z",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
  },
  {
    id: "7",
    studentName: "David Lee",
    studentId: "S78901",
    examName: "Organic Chemistry",
    incidentType: "suspicious_audio",
    severity: "low",
    status: "resolved",
    timestamp: "2023-06-15T12:05:33Z",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&q=80",
  },
];

export default IncidentList;
