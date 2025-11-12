import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
import RecruiterLayout from "../layouts/RecruiterLayout";
import Dashboard from "../pages/recruiter/Dashboard";
import JobForm from "../pages/recruiter/JobForm";
import ManageJob from "../pages/recruiter/ManageJob";

export default function RecruiterRoutes() {
  return (
    // <ProtectedRoute role="recruiter">
      <RecruiterLayout>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="joblist" element={<JobForm />} />
          <Route path="managejob" element={<ManageJob/>} />
        </Routes>
      </RecruiterLayout>
    // </ProtectedRoute>
  );
}
