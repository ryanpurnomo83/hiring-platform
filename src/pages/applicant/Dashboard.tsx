import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import rakaminLogoOnly from "../../../public/rakamin-logo-only.png";
import { TiLocationOutline } from "react-icons/ti";
import { LiaMoneyBillSolid } from "react-icons/lia";

import { jobListAPI } from "../../services/APIServices";
import type { JobListItem } from "../../interfaces/JobList";

export default function Dashboard() {
    const navigate = useNavigate();
    const [jobList, setJobList] =  useState<JobListItem[]>([]);
    const [selectedJob, setSelectedJob] = useState<JobListItem | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
          const jobs = await jobListAPI.fetchJobList();
          setJobList(jobs);

          if(jobs.length > 0){
            setSelectedJob(jobs[0]);
          }
        };
        fetchJobs();
    }, []);
    
    
    const showJobList = jobList.length > 0;
    // TAMBAHKAN INI sebelum return
    const descriptionList = selectedJob?.description
      ?.split("\n")
      .map(item => item.replace(/^-/, "").trim())
      .filter(item => item.length > 1) ?? [];


  return (
    <>
      <div className="flex gap-8 justify-center items-start p-6">
        {/* Job Card List Wrapper */}
        <div className="w-full max-w-md rounded-lg  h-[500px] overflow-y-scroll">

          {/* 🔴 Empty State */}
          {!showJobList && (
            <div className="text-center">
              <h1 className="text-xl font-semibold mb-2">
                No job opening available
              </h1>
              <p className="text-gray-600 mb-4">
                Create a job opening now and start the candidate process.
              </p>
              
            </div>
          )}

          {/* Job Card List */}
          {showJobList && (
          <div className="w-full max-w-md rounded-lg  h-[500px] overflow-y-scroll">
            {jobList.map((job, index) => (
            <div
              key={index} 
              onClick={() => setSelectedJob(job)}
              className={`border p-4 rounded-lg mb-4 cursor-pointer transition ${selectedJob?.id === job.id ? "border-blue-500 shadow-md bg-blue-50" : "bg-white"}`}>
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={rakaminLogoOnly}
                  alt="Rakamin Logo"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h2 className="font-semibold text-lg">{job.title}</h2>
                  <p className="text-gray-600 text-sm">{job.slug || "No slug"}</p>
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
              </div>
            </div>
            ))}
          </div>
          )}
        </div>


        {/* Job Description */}
        {selectedJob && (
          <div className="border p-6 w-full max-w-3xl rounded-lg shadow-sm bg-white">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={rakaminLogoOnly}
                  alt="Rakamin Logo"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-md mb-1">
                    {selectedJob.workTime}
                  </span>
                  <h2 className="font-semibold text-lg leading-tight">
                    {selectedJob.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{selectedJob.slug}</p>
                </div>
              </div>
              <button
                  onClick={() => {navigate("/applicant/jobform");}} 
                  className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium px-3 py-1 rounded-md transition">
                Apply
              </button>
            </div>

            <hr className="my-3" />

            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>
                {descriptionList?.map((item, index) => (
                  <li key={index}>{item}</li>
                )) || <li>No description available.</li>}
              </li>
            </ul>

          </div>
        )}
      </div>
    </>
  );
}
