import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import RoleRoute from "./component/RoleRoute";
import Assessment from "./pages/Assessment";
import Score from "./pages/Score";
import ToReview from "./pages/ToReview";
import Accepted from "./pages/Accepted";
import Selected from "./pages/Selected"
import Rejected from "./pages/Rejected";
import CandidateDashboard from "./pages/CandidateDashboard";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <RoleRoute requiredRole="admin">
              <Dashboard />
            </RoleRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/assessment"
          element={
            <RoleRoute requiredRole="candidate">
              <Assessment />
            </RoleRoute>
          }
        />
        <Route
          path="/candidateDashboard"
          element={
            <RoleRoute requiredRole="candidate">
              <CandidateDashboard />
            </RoleRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/score" element={<Score />} />
        <Route
          path="/to-review"
          element={
            <RoleRoute requiredRole="admin">
              <ToReview />
            </RoleRoute>
          }
        />
        <Route
          path="/accepted"
          element={
            <RoleRoute requiredRole="admin">
              <Accepted />
            </RoleRoute>
          }
        />
        <Route
          path="/selected"
          element={
            <RoleRoute requiredRole="admin">
              <Selected />
            </RoleRoute>
          }
        />
        <Route
          path="/rejected"
          element={
            <RoleRoute requiredRole="admin">
              <Rejected />
            </RoleRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
