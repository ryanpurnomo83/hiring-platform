// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

{/*}
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
*/}

import { AuthProvider } from "./context/AuthProvider";

import LoginSelectionPage from "./pages/auth/LoginSelectionPage";
import ApplicantLogin from "./pages/auth/applicant/ApplicantLogin";
import RecruiterLogin from "./pages/auth/recruiter/RecruiterLogin";
import ApplicantRegister from "./pages/auth/applicant/ApplicantRegister";
//import RecruiterRegister from "./pages/auth/recruiter/RecruiterRegister";
import ApplicantRoutes from "./routes/ApplicantRoutes";
import RecruiterRoutes from "./routes/RecruiterRoutes";

function App() {
 

  return (
    <>
      {/*  
       const [count, setCount] = useState(0)
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      */} 
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginSelectionPage />} />

            <Route path="/login/applicant" element={<ApplicantLogin/>}/>
            <Route path="/login/recruiter" element={<RecruiterLogin />} />
            {/* <Route path="/register/recruiter" element={<RecruiterRegister />} /> */}
            <Route path="/register/applicant" element={<ApplicantRegister />} />

            {/* Role-based routes */}
            <Route path="/applicant/*" element={<ApplicantRoutes />} />
            <Route path="/recruiter/*" element={<RecruiterRoutes />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
