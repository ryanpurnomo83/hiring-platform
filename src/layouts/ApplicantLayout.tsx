// src/layouts/ApplicantLayout.tsx
import type { ReactNode } from "react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

interface ApplicantLayoutProps {
  children: ReactNode;
}

export default function ApplicantLayout({ children }: ApplicantLayoutProps) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white text-black px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Applicant Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>{user?.name}</span>
          <button
            onClick={logout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-blue-100 px-6 py-2 flex gap-4 text-blue-700 font-medium">
        <Link to="/applicant/dashboard">Dashboard</Link>
        <Link to="/applicant/profile">Profile</Link>
        <Link to="/applicant/jobs">Jobs</Link>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
