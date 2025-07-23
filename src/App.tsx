import { Suspense, useState } from "react";
import {
  useRoutes,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./components/home";
import AdminDashboard from "./components/admin/AdminDashboard";
import StudentDashboard from "./components/student/StudentDashboard";
import ProctorDashboard from "./components/proctor/ProctorDashboard";
import ExamInProgress from "./components/student/ExamInProgress";
import ExamComplete from "./components/student/ExamComplete";
import {
  AdminLogin,
  ProctorLogin,
  StudentLogin,
  LoginSelector,
} from "./components/auth";
import routes from "tempo-routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<
    "admin" | "proctor" | "student" | null
  >(null);

  const handleLogin = (role: "admin" | "proctor" | "student") => {
    setIsAuthenticated(true);
    setUserRole(role);
    if (role === "admin") {
      window.location.href = "/admin/dashboard";
    } else if (role === "student") {
      window.location.href = "/student/dashboard";
    } else if (role === "proctor") {
      window.location.href = "/proctor/dashboard";
    } else {
      window.location.href = "#"
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    window.location.href = "/";
  };

  const handleBack = () => {
    window.location.href = "/"
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <LoginSelector
                onSelectRole={(role) => {
                  if (role === "admin") window.location.href = "/admin/login";
                  if (role === "proctor")
                    window.location.href = "/proctor/login";
                  if (role === "student")
                    window.location.href = "/student/login";
                }}
              />
            }
          />
          <Route
            path="/admin/login"
            element={<AdminLogin onLogin={() => handleLogin("admin")} onBackToSelector={handleBack} />}
          />
          <Route
            path="/proctor/login"
            element={<ProctorLogin onLogin={() => handleLogin("proctor")} onBack={handleBack} />}
          />
          <Route
            path="/student/login"
            element={<StudentLogin onLogin={() => handleLogin("student")} onBack={handleBack} />}
          />
          <Route
            path="/proctor/dashboard"
            element={<ProctorDashboard onLogout={handleLogout} />}
          />
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard onLogout={handleLogout} />}
          />
          <Route
            path="/student/dashboard"
            element={<StudentDashboard onLogout={handleLogout} />}
          />
          <Route path="/exam-in-progress" element={<ExamInProgress />} />
          <Route
            path="/exam-complete"
            element={
              <ExamComplete
                onReturnToDashboard={() =>
                  (window.location.href = "/student/dashboard")
                }
              />
            }
          />
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
