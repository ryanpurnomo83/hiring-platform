import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { getFirestore, doc, addDoc, getDoc, getDocs, setDoc, collection, query, where } from "firebase/firestore";
// import { GoogleLogin } from 'react-google-login';
// import { gapi } from 'gapi-script';

const firebaseConfig = {
  apiKey: "AIzaSyC5NP-Ao3qW4DkCV27z89UaAY34JRpWq5Q",
  authDomain: "frontend-engineer-rakamin-db.firebaseapp.com",
  projectId: "frontend-engineer-rakamin-db",
  storageBucket: "frontend-engineer-rakamin-db.firebasestorage.app",
  messagingSenderId: "880402767232",
  appId: "1:880402767232:web:4498a90c4172b07d6cf565",
  measurementId: "G-WM8TV10QNP"
};

const clientID = "880402767232-sqkbhjod5n29pst3mqr6ldrgkic07bms.apps.googleusercontent.com";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

async function saveApplicant(applicantData){
  try{
    const applicantsCol = collection(db, "users", "roles", "applicant"); // Collection ganjil: users/applicants
    
    const q = query(applicantsCol, where("email", "==", applicantData.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log("Email sudah terdaftar:", applicantData.email);
      return false;
    }

    await addDoc(applicantsCol, applicantData);
    console.log("Data applicant berhasil disimpan:", applicantData.email);
    return true;
  }catch(error){
    console.error("Gagal menyimpan data applicant:", error);
    return false;
  }
}

async function saveRecruiter(recruiterData){
  try{
    const recruitersRef = doc(db, "users", "recruiter");
    await setDoc(recruitersRef, recruiterData, { merge: true }); 
    console.log("Data applicant berhasil disimpan!");
  }catch(error){
    console.error("Gagal menyimpan data applicant:", error);
  }
}

// ✅ Ambil data recruiter dari Firestore
async function fetchRecruiters() {
  const recruitersRef = doc(db, "users", "recruiter");
  const docSnap = await getDoc(recruitersRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
}

// ✅ Ambil data applicant dari Firestore
async function fetchApplicants() {

  try {
    const applicantsRef = collection(db, "users", "roles", "applicant");
    const docSnap = await getDocs(applicantsRef);
    


    if (docSnap.empty) {
        console.log("No applicants found!");
        return null;
    }

    const data = docSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log("Applicants:", data);
    return data;
  }
  catch (error) {
    console.error("Failed to fetch applicants:", error);
    return null;
  }
}


export const authAPI = {

  async registerApplicant(userData){
    try{
      const applicants = await saveApplicant(userData);
      return applicants;
    }catch(error){
      console.error("🔥 Register error:", error);
      return false; 
    }
  },

  async loginApplicant(credentials){
    try{
      const applicants = await fetchRecruiters();
      if (!applicants) return null;
      
      const matched = Object.values(recruiters).find(
        (r) => 
          r.email === credentials.email
      );

      if(matched){
        console.log("✅ Login success:", matched);
        return matched;
      }else {
        console.log("❌ Invalid email or password");
        return null;
      }
    }catch(error){
      console.error("🔥 Register error:", error);
      return false; 
    }
  },

  async registerRecruiter(userData){
    try{
      const applicants = await saveRecruiter(userData);
      return applicants;
    }catch(error){
      console.error("🔥 Register error:", error);
      return false; 
    }
  },

  async loginRecruiter(credentials) {
    try {
      const recruiters = await fetchRecruiters();
      if (!recruiters) return null;

      const matched = Object.values(recruiters).find(
        (r) =>
          r.email === credentials.email &&
          r.password === credentials.password
      );

      if (matched) {
        console.log("✅ Login success:", matched);
        return matched;
      } else {
        console.log("❌ Invalid email or password");
        return null;
      }
    } catch (error) {
      console.error("🔥 Login error:", error);
      throw error;
    }
  },

  async loginGoogle(){
    try{
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const applicantsCol = collection(db, "users", "roles", "applicant"); 
      const q = query(applicantsCol, where("email", "==", applicantData.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log("Email sudah terdaftar:", applicantData.email);
        return false;
      }

      await addDoc(applicantsCol, applicantData);
      console.log("Data applicant berhasil disimpan:", applicantData.email);
      return true;
    }catch(error){
      console.error("Google login failed:", error);
      return null;
    }
  },

  async registerGoogle() {
    // Bisa sama dengan loginGoogle karena Firebase otomatis membuat user jika belum ada
    return await this.loginGoogle();
  },

  fetchRecruiters,
  fetchApplicants,
};


export const usersAPI = {

  async addPersonalData(){

  },

  async updatePersonalData(){

  },

  async deletePersonalData(){

  }

}


export const jobListAPI = {


};

fetchApplicants();

