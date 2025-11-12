import { useState } from "react";
import ProfilePicture from "../../../public/Profile-Picture.png"
import MediaForm from "../applicant/MediaForm"

import { IoArrowBackOutline } from "react-icons/io5";

export default function JobForm(){

    const [ShowMediaForm, setShowMediaForm] = useState(false);

    return(
        <>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="flex flex-col bg-white shadow-md rounded-xl p-8 w-full max-w-3xl">
        
        <div className="flex flex-row gap-6 bg-white mb-4">
            <button className="border border-gray-300 bg-white shadow-md p-2 hover:bg-gray-100 active:shadow-inner rounded-xl transition">
                <IoArrowBackOutline/>   
            </button>
            <h2 className="font-semibold text-lg">Apply Front End at Rakamin</h2>
        </div>
        
        <hr className="mb-4" />

        <label className="font-medium mb-4">Photo Profile</label>
        <img src={ProfilePicture} style={{width: "20%"}} className="mb-2"/>
        
        <button className="border" onClick={() => setShowMediaForm(true)}>Take a picture</button>

        <label className="font-medium">Full name</label>
        <input
            type="text"
            className="border border-gray-300 rounded p-2 mb-4"
            placeholder="Select Job Type"
        />

        <label className="font-medium">Date of Birth</label>
        <input type="date" className="border border-gray-300 rounded p-2 mb-4"/>

        <label className="font-medium">Pronoun (gender)</label>
        <div className="flex flex-row gap-8 mb-4">
            <input type="radio"/>She/her (Female)
            <input type="radio"/>He/him (Male)
        </div>
        
        <label className="font-medium">Domicile</label>
        <select className="border gap-8 mb-4">
            <option>Choose your domicile</option>
            <option>Jakarta</option>
            <option>Semarang</option>
        </select>

        <label className="font-medium">Domicile</label>
        <div className="mb-4">
            <select className="border">
                <option>Phone Number</option>
                <option>Jakarta</option>
                <option>Semarang</option>
            </select>
            <input type="number" placeholder="81xxxxxx" className="border pl-4"/>
        </div>
        
        <label>Email</label>
        <input
            type="email"
            className="border border-gray-300 rounded p-2 mb-4"
            placeholder="Enter your email address"
        />

        <label>Link Linkedin</label>
        <input
            type="text"
            className="border border-gray-300 rounded p-2 mb-4"
            placeholder="https://linkedin.com/in/username"
        />

        <button className="bg-teal-600 hover:bg-yellow-500 text-white font-medium px-5 py-2 rounded-md transition">
            Submit
        </button>
        </div>
        </div>

        {ShowMediaForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
                    <button
                      onClick={() => setShowMediaForm(false)}
                      className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
                    >
                      &times;
                    </button>
                    <MediaForm />
                  </div>
                </div>
        )}
        </>
    );
}