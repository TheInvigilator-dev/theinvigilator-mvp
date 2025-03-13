import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, AlertTriangle, Eye, X, MessageCircle } from "lucide-react";

interface Alert {
  id: string;
  studentName: string;
  examName: string;
  type: "face" | "movement" | "audio" | "screen";
  severity: "high" | "medium" | "low";
  timestamp: string;
  description: string;
  isNew: boolean;
}

interface AlertsPanelProps {
  alerts?: Alert[];
  onViewAlert?: (alertId: string) => void;
  onDismissAlert?: (alertId: string) => void;
  onContactStudent?: (alertId: string) => void;
}

const getAlertIcon = (type: Alert["type"]) => {
  switch (type) {
    case "face":
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case "movement":
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case "audio":
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case "screen":
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

const getAlertTypeLabel = (type: Alert["type"]) => {
  switch (type) {
    case "face":
      return "Face Verification";
    case "movement":
      return "Unusual Movement";
    case "audio":
      return "Suspicious Audio";
    case "screen":
      return "Screen Navigation";
    default:
      return "Unknown";
  }
};

const getSeverityBadge = (severity: Alert["severity"]) => {
  switch (severity) {
    case "high":
      return <Badge variant="destructive">High</Badge>;
    case "medium":
      return <Badge variant="secondary">Medium</Badge>;
    case "low":
      return <Badge variant="outline">Low</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const AlertsPanel = ({
  alerts = [
    {
      id: "1",
      studentName: "John Smith",
      examName: "Advanced Mathematics",
      type: "face",
      severity: "high",
      timestamp: "2023-06-15T10:23:45",
      description: "Multiple faces detected in camera view",
      isNew: true,
    },
    {
      id: "2",
      studentName: "Emily Johnson",
      examName: "Computer Science 101",
      type: "screen",
      severity: "high",
      timestamp: "2023-06-15T10:20:12",
      description: "Navigated away from test window",
      isNew: true,
    },
    {
      id: "3",
      studentName: "Michael Brown",
      examName: "Physics Fundamentals",
      type: "movement",
      severity: "medium",
      timestamp: "2023-06-15T10:15:30",
      description: "Unusual hand movements detected",
      isNew: false,
    },
    {
      id: "4",
      studentName: "Sarah Davis",
      examName: "Biology Final",
      type: "audio",
      severity: "medium",
      timestamp: "2023-06-15T10:10:05",
      description: "Voices detected in background",
      isNew: false,
    },
    {
      id: "5",
      studentName: "David Wilson",
      examName: "History Midterm",
      type: "face",
      severity: "low",
      timestamp: "2023-06-15T10:05:22",
      description: "Face not fully visible in frame",
      isNew: false,
    },
  ],
  onViewAlert = () => {},
  onDismissAlert = () => {},
  onContactStudent = () => {},
}: AlertsPanelProps) => {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "high" | "medium" | "low"
  >("all");

  const filteredAlerts = alerts.filter((alert) => {
    if (activeFilter === "all") return true;
    return alert.severity === activeFilter;
  });

  const newAlertsCount = alerts.filter((alert) => alert.isNew).length;

  return (
    <Card className="h-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            <CardTitle>Suspicious Activity Alerts</CardTitle>
            {newAlertsCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {newAlertsCount} New
              </Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("all")}
          >
            All
          </Button>
          <Button
            variant={activeFilter === "high" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("high")}
          >
            High
          </Button>
          <Button
            variant={activeFilter === "medium" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("medium")}
          >
            Medium
          </Button>
          <Button
            variant={activeFilter === "low" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("low")}
          >
            Low
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No alerts matching the selected filter
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`relative rounded-lg border p-4 ${alert.isNew ? "bg-blue-50 border-blue-200" : "bg-card"}`}
                >
                  {alert.isNew && (
                    <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500" />
                  )}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getAlertIcon(alert.type)}
                        <span className="font-medium">
                          {getAlertTypeLabel(alert.type)}
                        </span>
                        {getSeverityBadge(alert.severity)}
                      </div>
                      <h4 className="font-semibold">{alert.studentName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {alert.examName}
                      </p>
                      <p className="text-sm mt-1">{alert.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(alert.timestamp).toLocaleTimeString()} -{" "}
                        {new Date(alert.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => onViewAlert(alert.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => onContactStudent(alert.id)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" /> Contact
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-8 flex-shrink-0 p-0"
                      onClick={() => onDismissAlert(alert.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
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

export default AlertsPanel;
