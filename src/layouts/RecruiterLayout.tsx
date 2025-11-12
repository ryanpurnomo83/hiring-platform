import { useState, type ReactNode } from "react";
import { useAuth } from "../context/useAuth";
import { Link, useLocation } from "react-router-dom";
import { LogOut, User, Briefcase, Star } from "lucide-react";

interface RecruiterLayoutProps {
  children: ReactNode;
}

export default function RecruiterLayout({ children }: RecruiterLayoutProps) {
  const { user, logoutUser } = useAuth();
  const [isHovering, setIsHovering] = useState(false);
  const location = useLocation();
  
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const isManageJobPage = location.pathname === "/recruiter/managejob";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}

      {isManageJobPage ? (
      <header className="border-b-1 bg-white text-black px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">JobList</h1>
        <h1 className="text-xl font-semibold">Manage Candidate</h1>
        <div className="flex items-center gap-4">
          <span>{user?.name}</span>
          <div 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-10 h-10 rounded-full overflow-hidden border-1 border-blue-400 shadow-lg">
            <img/>
          </div>

          {isHovering && (
              <div
                className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 z-50 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <User className="w-10 h-10 text-blue-500" />
                  <div>
                    <h2 className="font-semibold text-gray-800">{user?.name}</h2>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <hr className="my-2" />

                <div className="space-y-2">
                  <Link
                    to="/digital-career-persona"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Briefcase className="w-4 h-4" /> Digital Career Persona
                  </Link>
                  <Link
                    to="/talent-profiler"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Star className="w-4 h-4" /> Talent Profiler
                  </Link>
                  <button
                    onClick={logoutUser}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 mt-3 w-full"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            )}

        </div>
      </header>):(
        <header className="border-b-1 bg-white text-black px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Job List</h1>
        <div className="flex items-center gap-4">
          <span>{user?.name}</span>
          <div 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-10 h-10 rounded-full overflow-hidden border-1 border-blue-400 shadow-lg">
            <img/>
          </div>

          {isHovering && (
              <div
                className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 z-50 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <User className="w-10 h-10 text-blue-500" />
                  <div>
                    <h2 className="font-semibold text-gray-800">{user?.name}</h2>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <hr className="my-2" />

                <div className="space-y-2">
                  <Link
                    to="/digital-career-persona"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Briefcase className="w-4 h-4" /> Digital Career Persona
                  </Link>
                  <Link
                    to="/talent-profiler"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Star className="w-4 h-4" /> Talent Profiler
                  </Link>
                  <button
                    onClick={logoutUser}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 mt-3 w-full"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            )}

        </div>
      </header>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
