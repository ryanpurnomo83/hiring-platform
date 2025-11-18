import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jobListAPI } from "../../services/APIServices.js"

export default function JobList() {

  const navigate = useNavigate();

  const [jobName, setJobName] = useState("");
  const [jobType, setJobType] = useState("");
  const [description, setDescription] = useState("");
  const [numCandidates, setNumCandidates] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [requiredData, setRequiredData] = useState({
    fullName: "mandatory",
    photo: "optional",
    gender: "optional",
    domicile: "optional",
    email: "mandatory",
    phone: "optional",
    linkedin: "off",
    dob: "optional",
  });

  // ✔ Daftar field yang akan di-loop
  const fields = [
    { key: "fullName", label: "Full Name" },
    { key: "photo", label: "Photo Profile" },
    { key: "gender", label: "Gender" },
    { key: "domicile", label: "Domicile" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone Number" },
    { key: "linkedin", label: "LinkedIn Link" },
    { key: "dob", label: "Date of Birth" },
  ];

  const updateImportance = (fieldKey, value) => {
    setRequiredData(prev => ({ ...prev, [fieldKey]: value }));
  };

  const handlePublishJob = async () => {
    const jobData = {
      position: jobName,
      workTime: jobType,
      description,
      numCandidates: Number(numCandidates),
      minSalary,
      maxSalary,
      createdAt: new Date(),
    };

    const result = await jobListAPI.addJobList(jobData);
    if (result) {
      alert("Lowongan berhasil disimpan!");
      navigate("/recruiter/dashboard");
    } else {
      alert("Lowongan sudah terdaftar atau gagal disimpan.");
    }
  }

  return (
    <div className="flex flex-col w-full max-w-5xl h-[600px]">
      <div className="flex flex-col w-full max-w-5xl overflow-y-scroll flex-grow">
        <h2 className="font-semibold text-lg mb-2">Job Opening</h2>
        <hr className="mb-4" />

        <label className="font-medium">Job Name</label>
        <input
          type="text"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4"
          placeholder="Ex. Front End Engineer"
        />

        <label className="font-medium">Job Type</label>
        <select 
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4" defaultValue="">
          <option value="" disabled hidden>Select Job Type</option>
          <option>Full-time</option>
          <option>Contract</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Freelance</option>
        </select>

        <label className="font-medium">Job Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded mb-4 h-[10px] w-full p-2 resize-none"
          placeholder="Describe the job"
        />

        <label className="font-medium">Number of Candidates Needed</label>
        <input
          type="number"
          value={numCandidates}
          onChange={(e) => setNumCandidates(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4"
          placeholder="Ex. 2"
        />

        <p className="font-medium mb-2">Job Salary (Range)</p>
        <div className="flex gap-2 mb-6">
          <div className="flex flex-col w-full">
            <label className="mb-1">Minimum Estimated Salary</label>
              <input
              type="text"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Min Salary"
            />
          </div>

          <div className="flex flex-col w-full">
              <label className="mb-1">Maximum Estimated Salary</label>
              <input
              type="text"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Max Salary"
              />
          </div>
        </div>

        <div className="flex flex-col w-full border border-gray-300 bg-white p-6 rounded-lg mb-10">
          <label className="mb-6">Minimum Profile Information Required</label>

          {fields.map((item, index) => (
            <div key={index} className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{item.label}</h3>

              <div className="flex gap-2">

                {/* MANDATORY */}
                <button
                  onClick={() => updateImportance(item.key, "mandatory")}
                  className={`border rounded-2xl px-3 py-1 shadow-md transition
                    ${requiredData[item.key] === "mandatory"
                      ? "bg-[#F3FBFC] border-[#4DB5BC] text-[#4DB5BC]"
                      : "bg-white border-gray-300"}
                  `}
                >
                  Mandatory
                </button>

                {/* OPTIONAL */}
                <button
                  onClick={() => updateImportance(item.key, "optional")}
                  className={`border rounded-2xl px-3 py-1 shadow-md transition
                    ${requiredData[item.key] === "optional"
                      ? "bg-[#F3FBFC] border-[#4DB5BC] text-[#4DB5BC]"
                      : "bg-white border-gray-300"}
                  `}
                >
                  Optional
                </button>

                {/* OFF */}
                <button
                  onClick={() => updateImportance(item.key, "off")}
                  className={`border rounded-2xl px-3 py-1 shadow-md transition
                    ${requiredData[item.key] === "off"
                      ? "bg-[#F3FBFC] border-[#4DB5BC] text-[#4DB5BC]"
                      : "bg-white border-gray-300"}
                  `}
                >
                  Off
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
      <button
        onClick={handlePublishJob} 
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-5 py-2 rounded-md transition">
          Publish Job
      </button>
    </div>
  );
}