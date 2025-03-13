import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./dashboard/Header";
import StatsSummary from "./dashboard/StatsSummary";
import LiveTestTakerGrid from "./dashboard/LiveTestTakerGrid";
import AlertsPanel from "./dashboard/AlertsPanel";
import UpcomingExams from "./dashboard/UpcomingExams";
import AIMonitoringPanel from "./monitoring/AIMonitoringPanel";
import FlaggedIncidentsPanel from "./incidents/FlaggedIncidentsPanel";
import ChatInterface from "./communication/ChatInterface";

interface HomeProps {
  userRole?: "admin" | "proctor" | "student" | null;
  onLogout?: () => void;
}

const Home = ({ userRole = "admin", onLogout = () => {} }: HomeProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no role is set
    if (!userRole) {
      navigate("/");
    }
  }, [userRole, navigate]);
  const [activeView, setActiveView] = useState<
    "dashboard" | "monitoring" | "incidents"
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
        onNotificationsClick={() => setActiveView("incidents")}
        onSettingsClick={() => console.log("Settings clicked")}
        onHelpClick={() => console.log("Help clicked")}
        onLogoutClick={onLogout}
      />

      <div className="flex-grow p-4">
        {activeView === "dashboard" && (
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
        )}

        {activeView === "monitoring" && selectedStudentId && (
          <AIMonitoringPanel
            studentId={selectedStudentId}
            studentName={`Student ${selectedStudentId}`} // In a real app, you would get the actual name
            examName="Current Exam" // In a real app, you would get the actual exam name
            onBack={handleBackToDashboard}
          />
        )}

        {activeView === "incidents" && (
          <FlaggedIncidentsPanel
            onAction={(action, incidentId) => {
              console.log(`Action ${action} taken on incident ${incidentId}`);
              if (action === "contact") {
                handleContactStudent(incidentId);
              }
            }}
          />
        )}
      </div>

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

export default Home;
