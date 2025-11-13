import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { TiLocationOutline } from "react-icons/ti";
import { LiaMoneyBillSolid } from "react-icons/lia";
import SearchBGIcon from "../../../public/search-bg-icon.png";
import JobForm from "./JobForm";
import { jobListAPI } from "../../services/APIServices";
import type { JobListItem } from "../../interfaces/JobList";
import rakaminLogoOnly from "../../../public/rakamin-logo-only.png";
import candidateList from "../../../public/Candidate_List.jpg";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [jobList, setJobList] =  useState<JobListItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Ambil data dari Firestore saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const jobs = await jobListAPI.fetchJobList();
      setJobList(jobs);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  // ✅ Jika ingin refresh manual (misal dari tombol)
  const handleFetchJobList = async () => {
    setLoading(true);
    const jobs = await jobListAPI.fetchJobList();
    setJobList(jobs);
    setLoading(false);
  };

  const showJobList = jobList.length > 0;

  return (
    <>
      <style>
        {`
          /* Scrollbar untuk Chrome, Edge, dan Safari */
          .scroll-blue::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }

          .scroll-blue::-webkit-scrollbar-track {
            background: #e5e7eb; /* abu-abu terang */
          }

          .scroll-blue::-webkit-scrollbar-thumb {
            background-color: #3b82f6; /* Tailwind blue-500 */
            border-radius: 10px;
            border: 2px solid #e5e7eb; /* buat efek padding */
          }

          /* Firefox */
          .scroll-blue {
            scrollbar-width: thin;
            scrollbar-color: #3b82f6 #e5e7eb;
          }
        `}
      </style>
      <div className="scroll-blue justify-center bg-gray-50 p-6">
        {/* 🔍 Search Bar */}

        <div className="flex justify-between items-center items-start gap-10 w-full mb-1">
          <div className="relative w-full mb-1">
            <input
              type="search"
              placeholder="Search by job details"
              className="border border-gray-300 rounded-md pl-3 pr-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
          </div>

          <div 
              className="relative border p-4 rounded-lg bg-cover bg-center w-72 h-40 flex flex-col justify-end"
              style={{ backgroundImage: `url(${candidateList})` }}>
              <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
              <div className="text-white relative z-10">
                <h2 className="font-semibold">Recruit the best candidates</h2>
                <p className="text-sm">Create jobs, invite, and hire with ease</p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 mt-2 rounded-md"
                >
                  Create a new job
                </button>
              </div>
          </div>
        </div>
        

        {/* 🟡 Loading state */}
        {loading && (
          <div className="text-center mt-2 text-gray-600">Loading...</div>
        )}

        {/* 🔴 Empty State */}
        {!loading && !showJobList && (
          <div className="text-center">
            <img
              src={SearchBGIcon}
              alt="No jobs background"
              style={{ width: "20%" }}
              className="mx-auto mb-4"
            />
            <h1 className="text-xl font-semibold mb-2">
              No job opening available
            </h1>
            <p className="text-gray-600 mb-4">
              Create a job opening now and start the candidate process.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-5 py-2 rounded-md transition"
            >
              Create a new job
            </button>
          </div>
        )}

        {/* ✅ Filled State (ada data job) */}
        {!loading && showJobList && (
          <div className="max-w-6xl mt-1">

            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleFetchJobList}
                className="text-sm text-blue-500 hover:underline"
              >
                Refresh
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto h-[500px]">
              {jobList.map((job, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={rakaminLogoOnly}
                      alt="Rakamin Logo"
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <h2 className="font-semibold text-lg">{job.title}</h2>
                      <p className="text-gray-600 text-sm">
                        {job.slug || "No slug"}
                      </p>
                    </div>
                  </div>

                  <div className="text-gray-700 text-sm space-y-1">
                    <p className="flex items-center gap-2">
                      <TiLocationOutline className="text-gray-500" />
                      Jakarta Selatan
                    </p>
                    <p className="flex items-center gap-2">
                      <LiaMoneyBillSolid className="text-gray-500" />
                      {job.salary_range?.display_text ||
                        `${job.salary_range?.min ?? "-"} - ${
                          job.salary_range?.max ?? "-"
                        } ${job.salary_range?.currency ?? ""}`}
                    </p>
                    {/*
                    <p className="text-gray-500 text-xs mt-1">
                      {job.list_card?.started_on_text
                        ? `Started on ${job.list_card.started_on_text}`
                        : ""}
                    </p>*/}
                  </div>

                  <div className="mt-3">
                    <button 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm"
                      onClick={ () => navigate("/recruiter/managejob")}>
                      {job.list_card?.cta ?? "Manage Job"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>

      {/* 🟢 Job Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
            >
              &times;
            </button>
            <JobForm />
          </div>
        </div>
      )}
    </>
  );
}
