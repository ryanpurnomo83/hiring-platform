import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { candidatesAPI } from "../../services/APIServices";

import MediaForm from "../applicant/MediaForm";
import ProfilePicture from "../../../public/Profile-Picture.png";

import { HiOutlineUpload } from "react-icons/hi";
import { IoArrowBackOutline } from "react-icons/io5";

export default function JobForm() {
  const navigate = useNavigate(); 
  const location = useLocation();
  const selectedJob = location.state?.selectedJob;
  const [showMediaForm, setShowMediaForm] = useState(false);

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(""); // "male" | "female"
  const [domicile, setDomicile] = useState("");
  const [phonePrefix, setPhonePrefix] = useState(""); // select
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(
    localStorage.getItem("capturedImage") || null
  );

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

  type Province = {
    id: number;
    name: string;
  };

  type City = {
    id: number;
    province_id: string;
    name: string;
  };

  const fetchCities = async () => {
    setLoadingCities(true);

    try {
      // 1. Ambil semua provinsi
      const provincesRes = await fetch(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      const provinces: Province[] = await provincesRes.json();

      let allCities: City[] = [];

      // 2. Loop setiap provinsi untuk ambil semua kota
      for (const prov of provinces) {
        const citiesRes = await fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov.id}.json`
        );

        const regencies: City[] = await citiesRes.json();

        // Gabungkan semua kota dari setiap provinsi
        allCities = [...allCities, ...regencies];
      }

      // 3. Masukkan hanya nama kotanya ke state
      setCities(allCities.map((c) => c.name));
    } catch (err) {
      console.error("Failed to fetch cities", err);
    }

    setLoadingCities(false);
  };

  useEffect(() => {
    fetchCities();
  }, []);

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
      jobIndex: selectedJob?.id || "",
      jobTitle: selectedJob?.title || "",
      jobSlug: selectedJob?.slug || "",
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
            <h2 className="font-semibold text-lg">{`Apply as ${selectedJob?.title}`}</h2>
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
            className="flex items-center justify-center gap-2 w-[160px] border border-[#EDEDED] rounded-lg shadow-md font-semibold p-2 mb-4"
            onClick={() => setShowMediaForm(true)}
          >
            <HiOutlineUpload className="text-xl"/>
            Take a Picture
          </button>

          <label className="font-medium">Full name</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 mb-4"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label className="font-medium">Date of Birth</label>
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-2 mb-4"
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
            className="border rounded-lg p-2 mb-4"
            value={domicile}
            onChange={(e) => setDomicile(e.target.value)}
          >
            <option value="">Choose your domicile</option>
            {loadingCities ? (
              <option>Loading cities...</option>
            ) : (
              cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))
            )}
            {/* <option value="Jakarta">Jakarta</option>
            <option value="Semarang">Semarang</option> */}
          </select>

          <label className="font-medium">Phone Number</label>
          <div className="flex mb-4 border rounded-lg">
            <select
              className="p-2"
              value={phonePrefix}
              onChange={(e) => setPhonePrefix(e.target.value)}
            >
              <option value="">Prefix</option>
              <option value="+62">+62</option>
              <option value="+61">+61</option>
            </select>
            <div className="border-l" />
            <p className="flex items-center pl-2">
              +62
            </p>
            <input
              type="tel"
              placeholder="81xxxxxx"
              className="ml-2 p-2 flex-1"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <label>Email</label>
          <input
            type="email"
            className="border border-gray-300 rounded-lg p-2 mb-4"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Link Linkedin</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 mb-4"
            placeholder="https://linkedin.com/in/username"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />

          <button
            className="bg-teal-600 hover:bg-yellow-500 text-white font-medium px-5 py-2 rounded-lg transition"
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
