// import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import rakaminLogoOnly from "../../../public/rakamin-logo-only.png";

export default function JobDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const job = state?.selectedJob;

  if (!job) return <p>No job selected</p>;

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-3">
      <img src={rakaminLogoOnly} className="w-14 h-14 mb-4" />
      <button
        onClick={() => {navigate("/applicant/jobform",{
            state: { selectedJob: job }
        });}} 
        className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium px-3 py-1 rounded-md transition">
          Apply
      </button>
      </div>
      <h1 className="text-xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.slug}</p>

      <hr className="my-4" />

      {job.description
        ?.split("\n")
        .map((line: string, i: number) => (
          <p key={i} className="text-gray-700 mb-1">
            {line}
          </p>
        ))}
    </div>
  );
}
