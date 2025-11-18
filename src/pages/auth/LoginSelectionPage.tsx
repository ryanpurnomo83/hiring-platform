import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";

import rakaminLogo from '../../../public/rakamin-logo.png';

export default function LoginSelectionPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center text-center">
        <img src={rakaminLogo}/>
        <h1 className="text-3xl font-bold mb-6">Selamat Datang di Portal Rakamin Academy</h1>
        <p className="text-gray-600 mb-8">
          Pilih peran untuk lanjut login.
        </p>
 
        <div className="flex flex-col gap-4 w-60">
          <Link
            to="/login/applicant"
            className="bg-[#4DB5BC] text-white py-2 rounded-lg hover:bg-[#01959F]"
          >
            Login as Applicant
          </Link>
          <Link
            to="/login/recruiter"
            className="bg-[#F8A92F] text-white py-2 rounded-lg hover:bg-[#FA9810]"
          >
            Login as Recruiter
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
