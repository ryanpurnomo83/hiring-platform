import { useNavigate } from "react-router-dom";
import rakaminLogoOnly from "../../../public/rakamin-logo-only.png";
import { TiLocationOutline } from "react-icons/ti";
import { LiaMoneyBillSolid } from "react-icons/lia";

export default function Dashboard() {
    const navigate = useNavigate();
  return (
    <>
      <div className="flex gap-8 justify-center items-start p-6">
        {/* Job Card List Wrapper */}
        <div className="w-full max-w-md rounded-lg  h-[500px] overflow-y-scroll">

          {/* Job Card List */}
          <div className="border p-4 rounded-lg mb-4">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={rakaminLogoOnly}
                alt="Rakamin Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h2 className="font-semibold text-lg">UX Designer</h2>
                <p className="text-gray-600 text-sm">Rakamin</p>
              </div>
            </div>

            <div className="text-gray-700 text-sm space-y-1">
              <p className="flex items-center gap-2">
                <TiLocationOutline className="text-gray-500" />
                Jakarta Selatan
              </p>
              <p className="flex items-center gap-2">
                <LiaMoneyBillSolid className="text-gray-500" />
                Rp7.000.000 - Rp15.000.000
              </p>
            </div>
          </div>

          <div className="border p-4 rounded-lg mb-4">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={rakaminLogoOnly}
                alt="Rakamin Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h2 className="font-semibold text-lg">UX Designer</h2>
                <p className="text-gray-600 text-sm">Rakamin</p>
              </div>
            </div>

            <div className="text-gray-700 text-sm space-y-1">
              <p className="flex items-center gap-2">
                <TiLocationOutline className="text-gray-500" />
                Jakarta Selatan
              </p>
              <p className="flex items-center gap-2">
                <LiaMoneyBillSolid className="text-gray-500" />
                Rp7.000.000 - Rp15.000.000
              </p>
            </div>
          </div>

          <div className="border p-4 rounded-lg mb-4">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={rakaminLogoOnly}
                alt="Rakamin Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h2 className="font-semibold text-lg">UX Designer</h2>
                <p className="text-gray-600 text-sm">Rakamin</p>
              </div>
            </div>

            <div className="text-gray-700 text-sm space-y-1">
              <p className="flex items-center gap-2">
                <TiLocationOutline className="text-gray-500" />
                Jakarta Selatan
              </p>
              <p className="flex items-center gap-2">
                <LiaMoneyBillSolid className="text-gray-500" />
                Rp7.000.000 - Rp15.000.000
              </p>
            </div>
          </div>

          <div className="border p-4 rounded-lg mb-4">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={rakaminLogoOnly}
                alt="Rakamin Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h2 className="font-semibold text-lg">Frontend Developer</h2>
                <p className="text-gray-600 text-sm">Rakamin</p>
              </div>
            </div>

            <div className="text-gray-700 text-sm space-y-1">
              <p className="flex items-center gap-2">
                <TiLocationOutline className="text-gray-500" />
                Jakarta Selatan
              </p>
              <p className="flex items-center gap-2">
                <LiaMoneyBillSolid className="text-gray-500" />
                Rp10.000.000 - Rp18.000.000
              </p>
            </div>
          </div>
        </div>

        {/* Job Description */}
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
                  Full-Time
                </span>
                <h2 className="font-semibold text-lg leading-tight">
                  UX Designer
                </h2>
                <p className="text-gray-600 text-sm">Rakamin</p>
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
              Develop, test, and maintain responsive, high-performance web
              applications using modern front-end technologies.
            </li>
            <li>
              Collaborate with UI/UX designers to translate wireframes and
              prototypes into functional code.
            </li>
            <li>
              Integrate front-end components with APIs and backend services.
            </li>
            <li>
              Ensure cross-browser compatibility and optimize applications for
              maximum speed and scalability.
            </li>
            <li>
              Write clean, reusable, and maintainable code following best
              practices and coding standards.
            </li>
            <li>
              Participate in code reviews, contributing to continuous
              improvement and knowledge sharing.
            </li>
            <li>
              Troubleshoot and debug issues to improve usability and overall
              application quality.
            </li>
            <li>
              Stay updated with emerging front-end technologies and propose
              innovative solutions.
            </li>
            <li>
              Collaborate in Agile/Scrum ceremonies, contributing to sprint
              planning, estimation, and retrospectives.
            </li>
          </ul>
        </div>


        {/* Empty State */}
        {/*}
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
        </div>*/}

      </div>
    </>
  );
}
