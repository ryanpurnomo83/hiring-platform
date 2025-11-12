// src/layouts/RecruiterLayout.tsx
import type { ReactNode } from "react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

interface RecruiterLayoutProps {
  children: ReactNode;
}

export default function RecruiterLayout({ children }: RecruiterLayoutProps) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="text-black px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Job List</h1>
        <div className="flex items-center gap-4">
          <span>{user?.name}</span>
          <button
            onClick={logout}
            className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-green-100 px-6 py-2 flex gap-4 text-green-700 font-medium">
        <Link to="/recruiter/dashboard">Dashboard</Link>
        <Link to="/recruiter/post-job">Post Job</Link>
        <Link to="/recruiter/applicants">Applicants</Link>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
