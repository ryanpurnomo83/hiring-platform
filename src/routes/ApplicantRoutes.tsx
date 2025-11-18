import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
import ApplicantLayout from "../layouts/ApplicantLayout";
import Dashboard from "../pages/applicant/Dashboard";
// import Profile from "../pages/applicant/Profile";
import JobForm from "../pages/applicant/JobForm";
import JobDetail from "../pages/applicant/JobDetail";

export default function ApplicantRoutes() {
  return (
    // <ProtectedRoute role="applicant">
      <ApplicantLayout>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jobdetail/:id" element={<JobDetail/>}/>
          <Route path="jobform" element={<JobForm/>} />
          {/* <Route path="profile" element={<Profile />} /> */}
        </Routes>
      </ApplicantLayout>
    // </ProtectedRoute>
  );
}
