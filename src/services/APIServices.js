import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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


async function fetchRecruiters() {
  try{
    const recruitersRef = collection(db, "users", "roles", "recruiter");
    const docSnap = await getDocs(recruitersRef);

    if (docSnap.empty) {
      console.log("No applicants found!");
      return null;
    } 

    const data = docSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Recruiters:", data);
    return data;
  }catch(error){
    console.error("Failed to fetch recruiters:", error);
    return null;
  }
}

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

  async loginGoogle(role){
    try{
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const usersCol = collection(db, `users/roles/${role}`);
      const q = query(usersCol);
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log("Email sudah terdaftar");
        return false;
      }

      console.log("Google Login Success:");
      return true;
    }catch(error){
      console.error("Google Login Failed:", error);
      return null;
    }
  },

  async registerGoogle(role) {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const usersCol = collection(db, `users/roles/${role}`);
      const q = query(usersCol);
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log("⚠️ Email sudah terdaftar:", user.email);
        return { success: false, message: "Email sudah terdaftar" };
      }

      await setDoc(doc(usersCol));

      console.log("✅ Registrasi Google berhasil:", user.email);
      return { success: true, user };
    } catch (error) {
      console.error("🔥 Register Google gagal:", error.message);
      return { success: false, error: error.message };
    }
  },

  async logoutUser(){
    try {
      await signOut(auth);
      console.log("👋 Logout berhasil");
      return true;
    } catch (error) {
      console.error("Logout gagal:", error.message);
      return false;
    }
  },

  onAuthStateChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  }
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

  async addJobList(jobListData) {
    try {
      const jobsCol = collection(db, "jobs");

      // Ambil semua dokumen untuk cek duplikat dan hitung nomor berikutnya
      const snapshot = await getDocs(jobsCol);
      let isDuplicate = false;

      snapshot.forEach((docSnap) => {
        const docData = docSnap.data();
        if (docData.data && Array.isArray(docData.data)) {
          for (const job of docData.data) {
            if (
              job.slug === jobListData.slug &&
              job.title === jobListData.title
            ) {
              isDuplicate = true;
            }
          }
        }
      });

      if (isDuplicate) {
        console.log(`Lowongan '${jobListData.title}' sudah terdaftar.`);
        return false;
      }

      const nextNumber = snapshot.size + 1;
      const jobId = `job_${String(nextNumber).padStart(4, "0")}`;

      const newJobData = {
    
        data: [
          {
            id: jobId ?? `job_${Date.now()}`,
            slug: jobListData.position ?? null,
            title: jobListData.position ?? null,
            status: jobListData.status ?? "Inactive",
            salary_range: {
              min: jobListData.minSalary ?? null,
              max: jobListData.maxSalary ?? null,
              currency: jobListData.currency ?? "IDR",
              display_text: jobListData.display_text ?? null,
            },
            candidates: jobListData.numCandidates,
            description: jobListData.description,
            list_card: {
              badge: jobListData.badge ?? "Inactive",
              started_on_text: jobListData.createdAt ?? null,
              cta: jobListData.cta ?? "Manage Job",
            },
          },
        ],
      };

      // Simpan ke Firestore (ID acak, tapi field id dikontrol)
      //await addDoc(jobsCol, newJobData);
      await setDoc(doc(db, "jobs", jobId), newJobData);
      console.log(`Lowongan '${jobListData.title}' berhasil disimpan dengan ID: ${jobId}`);
      return true;

    } catch (error) {
      console.error("Gagal menyimpan data job list:", error);
      return false;
    }
  },

  async fetchJobList(){
    try {
      const jobsCol = collection(db, "jobs");
      const snapshot = await getDocs(jobsCol);

      const allJobs = [];

      snapshot.forEach((docSnap) => {
        const docData = docSnap.data();
        if (docData.data && Array.isArray(docData.data)) {
          allJobs.push(...docData.data); // gabungkan semua job di array data
        }
      });

      console.log("Data job list berhasil diambil:", allJobs);
      return allJobs;

    } catch (error) {
      console.error("Gagal mengambil data job list:", error);
      return [];
    }
  }

};

fetchApplicants();
fetchRecruiters();

