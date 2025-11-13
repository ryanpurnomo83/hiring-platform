import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "../../../public/Profile-Picture.png";
import { candidatesAPI } from "../../services/APIServices";
//import { CandidatesInterface } from "../../interfaces/Candidate";
import MediaForm from "../applicant/MediaForm";

import { IoArrowBackOutline } from "react-icons/io5";

export default function JobForm() {
  const navigate = useNavigate();
  const [showMediaForm, setShowMediaForm] = useState(false);

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(""); // "male" | "female"
  const [domicile, setDomicile] = useState("");
  const [phonePrefix, setPhonePrefix] = useState(""); // select
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [profileImage, setProfileImage] = useState<string | null>(
    localStorage.getItem("capturedImage") || null
  );

    // Callback dari MediaForm
  const handleSubmitCapture = (img: string) => {
    setProfileImage(img);
  };

  const handleResetCapture = () => {
    setProfileImage(null);
  };

  const handleGoBack = () => {
    navigate("/applicant/dashboard");
  };

  //const [candidates, setCandidates] = useState<CandidatesInterface>({ data: [] });

  const handleSubmit = async() => {
    if (!fullName || !email) {
      alert("Full name dan email wajib diisi!");
      return;
    }

    const candidateData = {
      fullName,
      dateOfBirth,
      gender,
      domicile,
      phone: `${phonePrefix} ${phoneNumber}`,
      email,
      linkedin,
      photo: profileImage || "",
    };

    const response = await candidatesAPI.addPersonalData(candidateData); 
    if (response) {
      alert("Data kandidat berhasil disimpan!");
      // reset form jika perlu
      setFullName("");
      setDateOfBirth("");
      setGender("");
      setDomicile("");
      setPhonePrefix("");
      setPhoneNumber("");
      setEmail("");
      setLinkedin("");
      setProfileImage(null);
      localStorage.removeItem("capturedImage");
    } else {
      alert("Gagal menyimpan data kandidat. Mungkin email sudah terdaftar.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="flex flex-col bg-white shadow-md rounded-xl p-8 w-full max-w-3xl">
          <div className="flex flex-row gap-6 bg-white mb-4">
            <button 
                onClick={handleGoBack}
                className="border border-gray-300 bg-white shadow-md p-2 hover:bg-gray-100 active:shadow-inner rounded-xl transition">
              <IoArrowBackOutline />
            </button>
            <h2 className="font-semibold text-lg">Apply Front End at Rakamin</h2>
          </div>

          <hr className="mb-4" />

          <label className="font-medium mb-2">Photo Profile</label>
          {profileImage ? (
            <img src={profileImage} style={{ width: "150px",
    height: "150px", }} className="mb-2 rounded-full object-cover" />
            ) : (
            <img src={ProfilePicture} style={{ width: "20%" }} className="mb-2" />
          )}
          {/* <img src={ProfilePicture} style={{ width: "20%" }} className="mb-2" /> */}
          <button
            className="border p-2 mb-4"
            onClick={() => setShowMediaForm(true)}
          >
            Take a picture
          </button>

          <label className="font-medium">Full name</label>
          <input
            type="text"
            className="border border-gray-300 rounded p-2 mb-4"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label className="font-medium">Date of Birth</label>
          <input
            type="date"
            className="border border-gray-300 rounded p-2 mb-4"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <label className="font-medium">Pronoun (gender)</label>
          <div className="flex flex-row gap-8 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              She/her (Female)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              He/him (Male)
            </label>
          </div>

          <label className="font-medium">Domicile</label>
          <select
            className="border rounded p-2 mb-4"
            value={domicile}
            onChange={(e) => setDomicile(e.target.value)}
          >
            <option value="">Choose your domicile</option>
            <option value="Jakarta">Jakarta</option>
            <option value="Semarang">Semarang</option>
          </select>

          <label className="font-medium">Phone Number</label>
          <div className="flex gap-2 mb-4">
            <select
              className="border rounded p-2"
              value={phonePrefix}
              onChange={(e) => setPhonePrefix(e.target.value)}
            >
              <option value="">Prefix</option>
              <option value="+62">+62</option>
              <option value="+61">+61</option>
            </select>
            <input
              type="tel"
              placeholder="81xxxxxx"
              className="border rounded p-2 flex-1"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <label>Email</label>
          <input
            type="email"
            className="border border-gray-300 rounded p-2 mb-4"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Link Linkedin</label>
          <input
            type="text"
            className="border border-gray-300 rounded p-2 mb-4"
            placeholder="https://linkedin.com/in/username"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />

          <button
            className="bg-teal-600 hover:bg-yellow-500 text-white font-medium px-5 py-2 rounded-md transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      {showMediaForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
            <button
              onClick={() => setShowMediaForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
            >
              &times;
            </button>
            <MediaForm
                onSubmitCapture={handleSubmitCapture}
                onResetCapture={handleResetCapture}
                onClose={() => setShowMediaForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
