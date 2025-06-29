import React, { useState } from "react";
import Header from "../dashboard/Header";
import StatsSummary from "../dashboard/StatsSummary";
import LiveTestTakerGrid from "../dashboard/LiveTestTakerGrid";
import AlertsPanel from "../dashboard/AlertsPanel";
import UpcomingExams from "../dashboard/UpcomingExams";
import AIMonitoringPanel from "../monitoring/AIMonitoringPanel";
import FlaggedIncidentsPanel from "../incidents/FlaggedIncidentsPanel";
import ChatInterface from "../communication/ChatInterface";
import ExamCreationPanel from "./ExamCreationPanel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlusCircle,
  BarChart4,
  Users,
  AlertTriangle,
  Calendar,
} from "lucide-react";

interface AdminDashboardProps {
  onLogout?: () => void;
}

const AdminDashboard = ({ onLogout = () => { } }: AdminDashboardProps) => {
  const [activeView, setActiveView] = useState<
    "dashboard" | "monitoring" | "incidents" | "create-exam" | "reports"
  >("dashboard");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null,
  );
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(
    null,
  );
  const [showChat, setShowChat] = useState<boolean>(false);
  const [chatStudentId, setChatStudentId] = useState<string | null>(null);

  // Handle viewing student details
  const handleViewStudentDetails = (studentId: string) => {
    setSelectedStudentId(studentId);
    setActiveView("monitoring");
  };

  // Handle viewing alerts
  const handleViewAlerts = (studentId: string) => {
    setSelectedStudentId(studentId);
    setActiveView("monitoring");
  };

  // Handle sending message to student
  const handleSendMessage = (studentId: string) => {
    setChatStudentId(studentId);
    setShowChat(true);
  };

  // Handle viewing alert details
  const handleViewAlert = (alertId: string) => {
    setSelectedIncidentId(alertId);
    setActiveView("incidents");
  };

  // Handle contacting student from alert
  const handleContactStudent = (alertId: string) => {
    // In a real app, you would get the student ID associated with this alert
    const studentId = "student-" + alertId;
    setChatStudentId(studentId);
    setShowChat(true);
  };

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    setActiveView("dashboard");
    setSelectedStudentId(null);
    setSelectedIncidentId(null);
  };

  // Handle closing chat
  const handleCloseChat = () => {
    setShowChat(false);
    setChatStudentId(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header
        adminName="Admin User"
        adminEmail="admin@example.com"
        onNotificationsClick={() => setActiveView("incidents")}
        onSettingsClick={() => console.log("Settings clicked")}
        onHelpClick={() => console.log("Help clicked")}
        onLogoutClick={onLogout}
      />

      {activeView === "dashboard" && (
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="text-slate-500 mt-1">
              Manage exams and monitor proctoring activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Button
              onClick={() => setActiveView("create-exam")}
              className="flex items-center justify-center gap-2 h-24 bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle className="h-6 w-6" />
              <div className="flex flex-col items-start">
                <span className="text-lg font-semibold">Create Exam</span>
                <span className="text-xs opacity-90">
                  Set up a new examination
                </span>
              </div>
            </Button>

            <Button
              onClick={() => setActiveView("monitoring")}
              className="flex items-center justify-center gap-2 h-24 bg-green-600 hover:bg-green-700"
            >
              <Users className="h-6 w-6" />
              <div className="flex flex-col items-start">
                <span className="text-lg font-semibold">Live Monitoring</span>
                <span className="text-xs opacity-90">
                  View active exam sessions
                </span>
              </div>
            </Button>

            <Button
              onClick={() => setActiveView("incidents")}
              className="flex items-center justify-center gap-2 h-24 bg-amber-600 hover:bg-amber-700"
            >
              <AlertTriangle className="h-6 w-6" />
              <div className="flex flex-col items-start">
                <span className="text-lg font-semibold">Flagged Incidents</span>
                <span className="text-xs opacity-90">
                  Review suspicious activities
                </span>
              </div>
            </Button>

            <Button
              onClick={() => setActiveView("reports")}
              className="flex items-center justify-center gap-2 h-24 bg-purple-600 hover:bg-purple-700"
            >
              <BarChart4 className="h-6 w-6" />
              <div className="flex flex-col items-start">
                <span className="text-lg font-semibold">
                  Reports & Analytics
                </span>
                <span className="text-xs opacity-90">View exam statistics</span>
              </div>
            </Button>
          </div>

          <div className="space-y-6">
            <StatsSummary />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <LiveTestTakerGrid
                  onViewDetails={handleViewStudentDetails}
                  onSendMessage={handleSendMessage}
                  onViewAlerts={handleViewAlerts}
                />
              </div>
              <div className="space-y-6">
                <AlertsPanel
                  onViewAlert={handleViewAlert}
                  onDismissAlert={(alertId) =>
                    console.log("Dismiss alert", alertId)
                  }
                  onContactStudent={handleContactStudent}
                />
                <UpcomingExams />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === "monitoring" && selectedStudentId && (
        <AIMonitoringPanel
          studentId={selectedStudentId}
          studentName={`Student ${selectedStudentId}`} // In a real app, you would get the actual name
          examName="Current Exam" // In a real app, you would get the actual exam name
          onBack={handleBackToDashboard}
        />
      )}

      {activeView === "monitoring" && !selectedStudentId && (
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Button
              variant="outline"
              onClick={handleBackToDashboard}
              className="mr-4"
            >
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Live Exam Monitoring</h1>
          </div>
          <LiveTestTakerGrid
            onViewDetails={handleViewStudentDetails}
            onSendMessage={handleSendMessage}
            onViewAlerts={handleViewAlerts}
          />
        </div>
      )}

      {activeView === "incidents" && (
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Button
              variant="outline"
              onClick={handleBackToDashboard}
              className="mr-4"
            >
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Flagged Incidents</h1>
          </div>
          <FlaggedIncidentsPanel
            onAction={(action, incidentId) => {
              console.log(`Action ${action} taken on incident ${incidentId}`);
              if (action === "contact") {
                handleContactStudent(incidentId);
              }
            }}
          />
        </div>
      )}

      {activeView === "create-exam" && (
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Button
              variant="outline"
              onClick={handleBackToDashboard}
              className="mr-4"
            >
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Create New Exam</h1>
          </div>
          <ExamCreationPanel onExamCreated={handleBackToDashboard} />
        </div>
      )}

      {activeView === "reports" && (
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Button
              variant="outline"
              onClick={handleBackToDashboard}
              className="mr-4"
            >
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          </div>

          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="recent">Recent Exams</TabsTrigger>
              <TabsTrigger value="summary">Summary Reports</TabsTrigger>
              <TabsTrigger value="incidents">Incident Reports</TabsTrigger>
              <TabsTrigger value="proctors">Proctor Performance</TabsTrigger>
            </TabsList>

            <TabsContent
              value="recent"
              className="p-4 bg-white rounded-lg border"
            >
              <h2 className="text-xl font-semibold mb-4">
                Recent Exam Reports
              </h2>
              <p className="text-muted-foreground">
                Reports for recently completed exams will appear here.
              </p>
            </TabsContent>

            <TabsContent
              value="summary"
              className="p-4 bg-white rounded-lg border"
            >
              <h2 className="text-xl font-semibold mb-4">Summary Reports</h2>
              <p className="text-muted-foreground">
                Exam summary statistics and analytics will appear here.
              </p>
            </TabsContent>

            <TabsContent
              value="incidents"
              className="p-4 bg-white rounded-lg border"
            >
              <h2 className="text-xl font-semibold mb-4">Incident Reports</h2>
              <p className="text-muted-foreground">
                Reports of suspicious activities across all exams will appear
                here.
              </p>
            </TabsContent>

            <TabsContent
              value="proctors"
              className="p-4 bg-white rounded-lg border"
            >
              <h2 className="text-xl font-semibold mb-4">
                Proctor Performance
              </h2>
              <p className="text-muted-foreground">
                Proctor activity and performance metrics will appear here.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {showChat && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] z-50">
          <ChatInterface
            studentId={chatStudentId || undefined}
            studentName={`Student ${chatStudentId}`} // In a real app, you would get the actual name
            onClose={handleCloseChat}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
