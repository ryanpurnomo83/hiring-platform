import { useState } from "react"
import { CiSearch } from "react-icons/ci";
import SearchBGIcon from '../../../public/search-bg-icon.png';
import JobForm from "./JobForm";

export default function Dashboard() {

  const [showForm, setshowForm] = useState(false)

  return (
    <>
      <div className="justify-center min-h-screen bg-gray-50 p-2">
        {/* Search Bar */}
        <div className="relative w-full max-w-3xl mb-8">
          <input
            type="search"
            placeholder="Search by job details"
            className="border border-gray-300 rounded-md pl-3 pr-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
        </div>

        {/* Empty State */}
        <div className="text-center">
          <img 
            src={SearchBGIcon} 
            alt="No jobs background"
            style={{ width: "20%" }}
            className="mx-auto mb-4"
          />
          <h1 className="text-xl font-semibold mb-2">No job opening available</h1>
          <p className="text-gray-600 mb-4">
            Create a job opening now and start the candidate process.
          </p>
          <button 
            onClick={()=> setshowForm(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-5 py-2 rounded-md transition">
            Create a new job
          </button>
        </div>
      </div>

      {/*
      //card-list-container
      <div>
        
        //card-list
        <div>
          <p>Active</p>
          <p>started on 1 Oct 2025</p>
          <h2>Front End Developer</h2>
          <p>Rp7.000.000 - 8.000.000</p><button>Manage Job</button>
        </div>

      </div>
      */}

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl relative">
            <button
              onClick={() => setshowForm(false)}
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
