import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RecruiterLayout from "../layouts/RecruiterLayout";
import Dashboard from "../pages/recruiter/Dashboard";
import JobList from "../pages/recruiter/JobForm";

export default function RecruiterRoutes() {
  return (
    // <ProtectedRoute role="recruiter">
      <RecruiterLayout>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="joblist" element={<JobList />} />
        </Routes>
      </RecruiterLayout>
    // </ProtectedRoute>
  );
}
