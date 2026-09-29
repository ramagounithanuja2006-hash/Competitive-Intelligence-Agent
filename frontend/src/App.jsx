import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Competitors from "./pages/Competitors";
import MarketInsights from "./pages/MarketInsights";
import AIAnalysis from "./pages/AIAnalysis";
import Reports from "./pages/Reports";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/admin/AdminDashboard";

function ProtectedRoute({ children }) {
  const loggedIn = localStorage.getItem("ci_logged_in");

  return loggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* First page */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/competitors"
          element={
            <ProtectedRoute>
              <Competitors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/market-insights"
          element={
            <ProtectedRoute>
              <MarketInsights />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-analysis"
          element={
            <ProtectedRoute>
              <AIAnalysis />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}