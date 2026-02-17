import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* Auth */
import Login from "./components/Login";

/* Admin Pages */
import Dashboard from "./components/Dashboard";
import ScheduleExam from "./components/ScheduleExam";
import AddHall from "./components/AddHall";
import HallList from "./components/HallList";

/* Student Page */
import StudentDashboard from "./components/StudentDashboard";

/* Protected Route Component */
const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem("userRole");

  if (!role) {
    return <Navigate to="/" />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};


function App() {
  return (
    <Router>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/schedule-exam"
          element={
            <ProtectedRoute allowedRole="admin">
              <ScheduleExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-hall"
          element={
            <ProtectedRoute allowedRole="admin">
              <AddHall />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hall-list"
          element={
            <ProtectedRoute allowedRole="admin">
              <HallList />
            </ProtectedRoute>
          }
        />

        {/* Student Route */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div style={{ padding: "60px", textAlign: "center" }}>
              <h2>404 - Page Not Found</h2>
            </div>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
