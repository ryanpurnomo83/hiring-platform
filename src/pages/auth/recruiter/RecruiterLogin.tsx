import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../../../layouts/AuthLayout";
import { useAuth } from "../../../context/useAuth";

import { HiOutlineKey } from "react-icons/hi";
import { MdOutlineMail } from "react-icons/md";
import rakaminLogo from '../../../../public/rakamin-logo.png';
import googleLogo from '../../../../public/Google_Logo_2025.png';

export default function RecruiterLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    navigate("/recruiter/dashboard");
     // login({ role: "applicant", name: "Ryan" });
  };

  const handleLogin1 = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Email dan password harus diisi!");
      return;
    }

    const response = await login(email, password);

    if(response){
      navigate("/recruiter/dashboard");
    }else{
      alert("Email atau password salah.");
    }
  };

  const showPasswordInput = () => {
    setShowPassword(true);
  }

  return (  
    <AuthLayout>
      {/* onSubmit={handleLogin1} */}
      <form onSubmit={handleLogin1}>
      <div className="flex flex-col align-items justify-center w-full max-w-md">
        <img src={rakaminLogo} style={{width: "50%"}}/>
        <h2 className="text-2xl font-semibold mb-4">Masuk ke Rakamin</h2>
        <p>Belum punya akun? <Link to="/register/recruiter">Daftar</Link></p>
        <br/>
        <label>Alamat email</label>
        <input 
          type="email" 
          placeholder="Email" 
          className="border p-2 rounded w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        
        {showPassword && (
          <>
          <label>Kata Sandi</label>
          <input 
            type="password" 
            placeholder="Password" 
            className="border p-2 rounded w-full mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

          <a href={{}} className="mb-6">Lupa kata sandi</a>

            <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded w-full">
              Masuk
            </button>

            <br />
            <hr />
            <br />

            <button
              onClick={showPasswordInput}
              className="border p-2 text-black px-4 py-2 rounded w-full flex items-center justify-center gap-2 hover:bg-blue-200 transition"
            >
              <MdOutlineMail className="w-5 h-5" />
              <span>Kirim link login melalui email</span>
            </button>

            <br />
            <button
              onClick={handleLogin}
              className="border p-2 text-black px-4 py-2 rounded w-full flex items-center justify-center gap-2 hover:bg-blue-200 transition"
            >
              <img src={googleLogo} className="w-5 h-5" /> Daftar dengan Google
            </button>
            </>
        )}

        {!showPassword && (
          <>
            <button
              onClick={handleLogin}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded w-full"
            >
              Kirim Link
            </button>

            <br />
            <hr />
            <br />

            <button
              onClick={showPasswordInput}
              className="border p-2 text-black px-4 py-2 rounded w-full flex items-center justify-center gap-2 hover:bg-blue-200 transition"
            >
              <HiOutlineKey className="w-5 h-5" />
              <span>Masuk dengan kata sandi</span>
            </button>

            <br />
            <button
              onClick={handleLogin}
              className="border p-2 text-black px-4 py-2 rounded w-full flex items-center justify-center gap-2 hover:bg-blue-200 transition"
            >
              <img src={googleLogo} className="w-5 h-5" /> Daftar dengan Google
            </button>
          </>
        )}
      </div>
      </form>
    </AuthLayout>
  );
}
