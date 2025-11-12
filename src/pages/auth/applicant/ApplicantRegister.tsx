// src/pages/auth/applicant/ApplicantLogin.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../../../layouts/AuthLayout";
import { useAuth } from "../../../context/useAuth";

import rakaminLogo from '../../../../public/rakamin-logo.png';
import googleLogo from '../../../../public/Google_Logo_2025.png';

export default function ApplicantLogin() {
  const { registerApplicant, registerGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  //const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Email dan password harus diisi!");
    }
    const response = await registerApplicant(email);
    console.log(response);
    if(response){
      navigate("/applicant/dashboard");
    }else{
      alert("Email sudah terpakai.");
    }
  };

  const handleRegisterGoogle = async () => {
    try {
      const user = await registerGoogle(); // Memanggil function loginGoogle dari context
      if (user) {
        console.log("Login Google berhasil:", user);
        navigate("/applicant/dashboard");
      } else {
        alert("Login dengan Google gagal!");
      }
    } catch (error) {
      console.error("Error Google login:", error);
      alert("Login dengan Google gagal!");
    }
  };

  return (  
    <AuthLayout>
      <form onSubmit={handleRegister}>
      <div className="flex flex-col align-items justify-center w-full max-w-md">
        <img src={rakaminLogo} style={{width: "50%"}}/>
        <h2 className="text-2xl font-semibold mb-4">Bergabung dengan Rakamin</h2>
        <p>Sudah punya akun? <Link to="/login/applicant">Masuk</Link></p>
        <br/>
        <label>Alamat email</label>
        <input 
          type="email" 
          placeholder="Email"
          className="border p-2 rounded w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded w-full"
            >
              Daftar dengan email
            </button>

            <br />
            <hr />
            
            <br />
            <button
              onClick={handleRegisterGoogle}
              className="border p-2 text-black px-4 py-2 rounded w-full flex items-center justify-center gap-2 hover:bg-blue-200 transition"
            >
              <img src={googleLogo} className="w-5 h-5" /> Daftar dengan Google
            </button>
      </div>
      </form>
    </AuthLayout>
  );
}
