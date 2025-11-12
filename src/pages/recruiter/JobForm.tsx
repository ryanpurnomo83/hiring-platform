import { useNavigate } from "react-router-dom";

export default function JobList() {

  const navigate = useNavigate();

  const handlePublishJob = () => {
    navigate("/recruiter/joblist");
  }

  return (
    <div className="flex flex-col w-full max-w-5xl h-[600px]">
      <div className="flex flex-col w-full max-w-5xl overflow-y-scroll flex-grow">
        <h2 className="font-semibold text-lg mb-2">Job Opening</h2>
        <hr className="mb-4" />

        <label className="font-medium">Job Name</label>
        <input
          type="text"
          className="border border-gray-300 rounded p-2 mb-4"
          placeholder="Ex. Front End Engineer"
        />

        <label className="font-medium">Job Type</label>
        <select className="border border-gray-300 rounded p-2 mb-4" defaultValue="">
          <option value="" disabled hidden>Select Job Type</option>
          <option>Full-time</option>
          <option>Contract</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Freelance</option>
        </select>

        <label className="font-medium">Job Description</label>
        <textarea
          className="border border-gray-300 rounded mb-4 h-[10px] w-full p-2 resize-none"
          placeholder="Describe the job"
        />

        <label className="font-medium">Number of Candidates Needed</label>
        <input
          type="number"
          className="border border-gray-300 rounded p-2 mb-4"
          placeholder="Ex. 2"
        />

        <p className="font-medium mb-2">Job Salary (Range)</p>
        <div className="flex gap-2 mb-6">
          <div className="flex flex-col w-full">
              <label className="mb-1">Minimum Estimated Salary</label>
              <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Min Salary"
              />
          </div>

          <div className="flex flex-col w-full">
              <label className="mb-1">Maximum Estimated Salary</label>
              <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Max Salary"
              />
          </div>
        </div>

        <div className="flex flex-col w-full border border-gray-300 bg-white p-6 rounded-lg mb-10">

          <label className="mb-6">Minimum Profile Information Required</label>

          <div className="flex items-center justify-between">
            <h3 className="font-medium">Full Name</h3>
            <div className="flex gap-2">
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Mandatory
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Optional
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Off
              </button>
            </div>
          </div>

          <br/>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Photo Profile</h3>
            <div className="flex gap-2">
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Mandatory
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Optional
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Off
              </button>
            </div>
          </div>

          <br/>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Gender</h3>
            <div className="flex gap-2">
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Mandatory
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Optional
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Off
              </button>
            </div>
          </div>

          <br/>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Domicile</h3>
            <div className="flex gap-2">
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Mandatory
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Optional
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Off
              </button>
            </div>
          </div>

          <br/>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Email</h3>
            <div className="flex gap-2">
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Mandatory
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Optional
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Off
              </button>
            </div>
          </div>

          <br/>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Phone Number</h3>
            <div className="flex gap-2">
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Mandatory
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Optional
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Off
              </button>
            </div>
          </div>

          <br/>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Linkedin link</h3>
            <div className="flex gap-2">
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Mandatory
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Optional
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Off
              </button>
            </div>
          </div>

          <br/>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Date of Birth</h3>
            <div className="flex gap-2">
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Mandatory
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Optional
              </button>
              <button className="border border-gray-300 rounded px-3 py-1 shadow-md bg-white hover:bg-gray-100 transition">
                Off
              </button>
            </div>
          </div>

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